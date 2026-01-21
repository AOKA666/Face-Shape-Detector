import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
  }

  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const email: string | undefined = body?.email
  const site: string = body?.site || "faceshapedetector"

  if (!email || !validateEmail(email.trim().toLowerCase())) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  }

  const supabase = getSupabaseClient()

  const payload = {
    email: email.trim().toLowerCase(),
    site,
    created_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("leads").upsert(payload, { onConflict: "email,site" })

  if (error) {
    console.error("Supabase insert error", error)
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
