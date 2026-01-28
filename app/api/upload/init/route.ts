import { NextResponse } from "next/server"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { randomBytes } from "crypto"

export const runtime = "nodejs"

const MAX_FILE_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png"])
const SIGNED_URL_EXPIRES_IN = 60

const IP_RATE_LIMIT = { limit: 10, windowMs: 60 * 1000 }
const FP_RATE_LIMIT = { limit: 30, windowMs: 60 * 60 * 1000 }
const GLOBAL_RATE_LIMIT = { limit: 1000, windowMs: 60 * 60 * 1000 }
const HASH_DEDUP_WINDOW_MS = 5 * 60 * 1000

type RateLog = Map<string, number[]>
const ipLog: RateLog = new Map()
const fpLog: RateLog = new Map()
let globalLog: number[] = []

type HashEntry = { ip: string; fingerprint?: string; timestamp: number }
const hashLog: Map<string, HashEntry[]> = new Map()

let supabase: SupabaseClient | null = null
const ensuredBuckets = new Set<string>()

function getClientIp(request: Request): string | undefined {
  const xForwardedFor = request.headers.get("x-forwarded-for")
  if (xForwardedFor) {
    const ip = xForwardedFor.split(",")[0]?.trim()
    if (ip) return ip
  }

  const realIp = request.headers.get("x-real-ip")
  if (realIp) return realIp

  const forwarded = request.headers.get("forwarded")
  if (forwarded) {
    const match = forwarded.match(/for=([^;]+)/i)
    const ip = match?.[1]?.replace(/^\[|\]$/g, "").trim()
    if (ip) return ip
  }

  return undefined
}

function consumeRateLimit(key: string, log: RateLog, limit: number, windowMs: number) {
  const now = Date.now()
  const windowStart = now - windowMs
  const timestamps = (log.get(key) ?? []).filter((ts) => ts > windowStart)

  if (timestamps.length >= limit) {
    log.set(key, timestamps)
    const retryAt = Math.min(...timestamps) + windowMs
    const retryAfterSeconds = Math.max(1, Math.ceil((retryAt - now) / 1000))
    return { allowed: false, retryAfterSeconds }
  }

  timestamps.push(now)
  log.set(key, timestamps)
  return { allowed: true }
}

function consumeGlobalLimit() {
  const now = Date.now()
  const windowStart = now - GLOBAL_RATE_LIMIT.windowMs
  globalLog = globalLog.filter((ts) => ts > windowStart)
  if (globalLog.length >= GLOBAL_RATE_LIMIT.limit) {
    const retryAt = Math.min(...globalLog) + GLOBAL_RATE_LIMIT.windowMs
    const retryAfterSeconds = Math.max(1, Math.ceil((retryAt - now) / 1000))
    return { allowed: false, retryAfterSeconds }
  }
  globalLog.push(now)
  return { allowed: true }
}

async function verifyTurnstile(token: string, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  const bypassToken = process.env.TURNSTILE_BYPASS_TOKEN

  if (bypassToken && token === bypassToken) return true
  if (!secret) {
    throw new Error("TURNSTILE_SECRET_KEY is not configured")
  }

  const form = new URLSearchParams()
  form.append("secret", secret)
  form.append("response", token)
  if (ip) form.append("remoteip", ip)

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  })

  if (!res.ok) return false
  const data = await res.json().catch(() => ({}))
  return Boolean(data?.success)
}

function sanitizeExtension(ext?: string, fallback = "jpg") {
  if (!ext || typeof ext !== "string") return fallback
  const clean = ext.replace(/[^a-z0-9]/gi, "").toLowerCase()
  return clean || fallback
}

function buildObjectPath(ext: string) {
  const random = randomBytes(8).toString("hex")
  return `uploads/${Date.now()}-${random}.${ext}`
}

function getSupabaseClient(): SupabaseClient {
  if (supabase) return supabase

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
  }

  supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
  return supabase
}

async function ensureBucketExists(client: SupabaseClient, bucket: string) {
  if (ensuredBuckets.has(bucket)) return

  const { data: buckets, error } = await client.storage.listBuckets()
  if (error) {
    console.error("Failed to list buckets", error)
    return
  }

  const exists = buckets?.some((item) => item.name === bucket)
  if (exists) {
    ensuredBuckets.add(bucket)
    return
  }

  const { error: createError } = await client.storage.createBucket(bucket, {
    public: true,
    fileSizeLimit: MAX_FILE_BYTES,
    allowedMimeTypes: Array.from(ALLOWED_TYPES),
  })

  if (createError) {
    console.error("Failed to create bucket", createError)
    return
  }

  ensuredBuckets.add(bucket)
}

function checkDuplicate(hash: string, ip: string, fingerprint?: string) {
  const now = Date.now()
  const entries = (hashLog.get(hash) ?? []).filter((item) => now - item.timestamp < HASH_DEDUP_WINDOW_MS)

  const match = entries.find((item) => item.ip === ip || (fingerprint && item.fingerprint === fingerprint))
  if (match) {
    return {
      duplicate: true,
      retryAfterSeconds: Math.max(1, Math.ceil((match.timestamp + HASH_DEDUP_WINDOW_MS - now) / 1000)),
    }
  }

  entries.push({ ip, fingerprint, timestamp: now })
  hashLog.set(hash, entries)
  return { duplicate: false }
}

export async function POST(request: Request) {
  const ip = getClientIp(request) ?? "unknown"

  const body = await request.json().catch(() => ({}))
  const contentType: string | undefined = body?.contentType
  const size: number | undefined = body?.size
  const extension: string | undefined = body?.extension
  const fingerprint: string | undefined = body?.fingerprint
  const hash: string | undefined = body?.hash
  const captchaToken: string | undefined = body?.captchaToken
  const width: number | undefined = body?.width
  const height: number | undefined = body?.height

  if (!captchaToken) {
    return NextResponse.json({ error: "Missing Turnstile token" }, { status: 403 })
  }

  if (!contentType || !ALLOWED_TYPES.has(contentType)) {
    return NextResponse.json({ error: "Only image/jpeg and image/png are allowed" }, { status: 400 })
  }

  if (!size || typeof size !== "number" || size <= 0 || size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "File too large or invalid size" }, { status: 400 })
  }

  if (!fingerprint || typeof fingerprint !== "string") {
    return NextResponse.json({ error: "Missing fingerprint" }, { status: 400 })
  }

  if (!hash || typeof hash !== "string" || hash.length < 16) {
    return NextResponse.json({ error: "Missing or invalid file hash" }, { status: 400 })
  }

  if (width !== undefined && (typeof width !== "number" || width <= 0 || width > 8000)) {
    return NextResponse.json({ error: "Invalid image width" }, { status: 400 })
  }

  if (height !== undefined && (typeof height !== "number" || height <= 0 || height > 8000)) {
    return NextResponse.json({ error: "Invalid image height" }, { status: 400 })
  }

  const ipLimit = consumeRateLimit(ip, ipLog, IP_RATE_LIMIT.limit, IP_RATE_LIMIT.windowMs)
  if (!ipLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests from this IP. Please slow down." },
      { status: 429, headers: { "Retry-After": `${ipLimit.retryAfterSeconds}` } }
    )
  }

  const fpLimit = consumeRateLimit(fingerprint, fpLog, FP_RATE_LIMIT.limit, FP_RATE_LIMIT.windowMs)
  if (!fpLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests from this device. Please try later." },
      { status: 429, headers: { "Retry-After": `${fpLimit.retryAfterSeconds}` } }
    )
  }

  const globalLimit = consumeGlobalLimit()
  if (!globalLimit.allowed) {
    return NextResponse.json(
      { error: "Upload service is busy. Please retry shortly." },
      { status: 429, headers: { "Retry-After": `${globalLimit.retryAfterSeconds}` } }
    )
  }

  const captchaOk = await verifyTurnstile(captchaToken, ip).catch((error) => {
    console.error("Turnstile verification error", error)
    return false
  })
  if (!captchaOk) {
    return NextResponse.json({ error: "Captcha verification failed" }, { status: 403 })
  }

  const dedup = checkDuplicate(hash, ip, fingerprint)
  if (dedup.duplicate) {
    return NextResponse.json(
      { error: "Duplicate upload detected. Please try a different image.", hash },
      { status: 409, headers: { "Retry-After": `${dedup.retryAfterSeconds}` } }
    )
  }

  let supabaseClient: SupabaseClient
  try {
    supabaseClient = getSupabaseClient()
  } catch (error) {
    console.error("Supabase configuration error", error)
    return NextResponse.json({ error: "Storage is not configured" }, { status: 500 })
  }

  const bucket = process.env.SUPABASE_UPLOAD_BUCKET || "uploads"
  await ensureBucketExists(supabaseClient, bucket)

  const ext = sanitizeExtension(extension || contentType.split("/")[1] || "jpg")
  const objectPath = buildObjectPath(ext)

  const { data, error } = await supabaseClient.storage.from(bucket).createSignedUploadUrl(objectPath, SIGNED_URL_EXPIRES_IN)
  if (error || !data?.signedUrl) {
    console.error("Supabase signed upload error", error)
    return NextResponse.json({ error: "Failed to create upload URL" }, { status: 500 })
  }

  const fileUrl = supabaseClient.storage.from(bucket).getPublicUrl(objectPath).data.publicUrl

  return NextResponse.json({
    uploadUrl: data.signedUrl,
    fileUrl,
    path: objectPath,
    token: data.token,
    expiresIn: SIGNED_URL_EXPIRES_IN,
    method: "PUT",
    headers: { "Content-Type": contentType },
  })
}
