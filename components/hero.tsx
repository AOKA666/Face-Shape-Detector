"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Hourglass, Upload, X } from "lucide-react"
import { track } from "@/lib/analytics"
import { useResultView } from "@/lib/analytics/useResultView"
import { useSubmitViewInPage } from "@/lib/analytics/useSubmitViewInPage"

type FeatureScores = Record<string, number | string>

interface SectionBlock {
  shape?: string
  description?: string
  summary?: string
  overallComment?: string
  measurements?: Record<string, string>
  facialMeasurements?: Record<string, string>
  scores?: FeatureScores
  probabilities?: Record<string, number | string>
  recommendations?: string[]
}

interface AnalysisPayload {
  analysisId?: string
  summary?: {
    overallScore?: number
    overallComment?: string
    featureRatings?: FeatureScores
  }
  shape?: SectionBlock
  eyes?: SectionBlock
  brows?: SectionBlock
  lips?: SectionBlock
  nose?: SectionBlock
  raw?: string
}

const detailTabConfig = [
  { label: "Shape", key: "shape" },
  { label: "Score", key: "score" },
  { label: "Eyes", key: "eyes" },
  { label: "Brows", key: "brows" },
  { label: "Lips", key: "lips" },
  { label: "Nose", key: "nose" },
] as const

type DetailTabKey = (typeof detailTabConfig)[number]["key"]

const featureRatingKeyByTab: Partial<Record<DetailTabKey, string>> = {
  eyes: "Eyes",
  brows: "Eyebrows",
  lips: "Lips",
  nose: "Nose",
}

const summaryFeatureOrder = ["Eyes", "Eyebrows", "Lips", "Nose"] as const

const probabilityKeyOrder = ["Square", "Round", "Diamond", "Heart", "Oblong", "Oval"]

const MAX_UPLOAD_SIDE = 1024
const MAX_UPLOAD_SIZE = 5 * 1024 * 1024 // 5 MB

const ANALYTICS_SITE = "yourface.online"
const ANALYTICS_TOOL = "face_shape"
const ANALYTICS_VARIANT = process.env.NEXT_PUBLIC_EXPERIMENT_VARIANT

function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, base64] = dataUrl.split(",")
  if (!base64) throw new Error("Invalid data URL")
  const mimeMatch = meta.match(/data:([^;]+);base64/)
  const mime = mimeMatch?.[1] ?? "application/octet-stream"
  const binary = atob(base64)
  const len = binary.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new Blob([bytes], { type: mime })
}

type UploadInfo = { uploadUrl: string; fileUrl: string; path: string }

async function requestUploadInit(params: {
  contentType: string
  extension?: string
  size: number
  fingerprint: string
  hash: string
  width?: number
  height?: number
}): Promise<UploadInfo> {
  const res = await fetch("/api/upload/init", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
  const payload = await res.json()
  if (!res.ok) {
    const message = typeof payload?.error === "string" ? payload.error : "Failed to init upload"
    throw new Error(message)
  }
  return payload as UploadInfo
}

async function sha256Hex(blob: Blob): Promise<string> {
  const buffer = await blob.arrayBuffer()
  const digest = await crypto.subtle.digest("SHA-256", buffer)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function getFingerprint(): string {
  if (typeof window === "undefined") return "unknown"
  const key = "fsd_fingerprint"
  const existing = localStorage.getItem(key)
  if (existing) return existing
  const fp = crypto.randomUUID()
  localStorage.setItem(key, fp)
  return fp
}

function generateAnalysisId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

async function resizeImageFile(
  file: File,
  maxSide = MAX_UPLOAD_SIDE
): Promise<{ dataUrl: string; width: number; height: number }> {
  const bitmap = await createImageBitmap(file)
  const longest = Math.max(bitmap.width, bitmap.height)
  let targetWidth = bitmap.width
  let targetHeight = bitmap.height

  if (longest > maxSide) {
    const ratio = maxSide / longest
    targetWidth = Math.max(1, Math.round(bitmap.width * ratio))
    targetHeight = Math.max(1, Math.round(bitmap.height * ratio))
  }

  const canvas = document.createElement("canvas")
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight)
  }
  bitmap.close()

  return {
    dataUrl: canvas.toDataURL("image/jpeg", 0.95),
    width: targetWidth,
    height: targetHeight,
  }
}

function parseNumber(value: number | string | undefined): number | undefined {
  if (value === undefined || value === null) return undefined
  if (typeof value === "number") return value
  const parsed = parseFloat(String(value).replace("%", "").trim())
  return Number.isFinite(parsed) ? parsed : undefined
}

function getScoreColor(score?: number): string {
  if (score === undefined) return "#84cc16"
  if (score >= 8) return "#22c55e" // green
  if (score >= 6) return "#a3e635" // lime
  if (score >= 4) return "#f59e0b" // orange
  return "#ef4444" // red
}

function ProbabilityBars({ data }: { data?: Record<string, number | string> }) {
  if (!data) return null
  const entries = probabilityKeyOrder
    .map((key) => (key in data ? [key, data[key]] : undefined))
    .filter(Boolean) as [string, number | string][]

  if (!entries.length) return null

  return (
    <div className="space-y-3">
      {entries.map(([label, rawValue]) => {
        const numeric = parseNumber(rawValue) ?? 0
        const displayValue = String(rawValue).replace("%", "")
        return (
          <div key={label} className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-white/60">
            <span className="w-20 text-left text-[11px]">{label}</span>
            <div className="flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-1 rounded-full bg-amber-400"
                style={{ width: `${Math.min(Math.max(numeric, 0), 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-white">{`${displayValue}%`}</span>
          </div>
        )
      })}
    </div>
  )
}

function MeasurementGrid({ measurements }: Record<string, string> | undefined) {
  if (!measurements) return null
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Object.entries(measurements).map(([label, value]) => (
        <div
          key={label}
          className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-xs text-white/60"
        >
          <p className="text-[11px] uppercase tracking-wide text-white/50">{label}</p>
          <p className="mt-1 text-base font-semibold text-white">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ScoreGrid({ scores }: FeatureScores | undefined) {
  if (!scores) return null
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Object.entries(scores).map(([label, value]) => {
        const numeric = parseNumber(value)
        const percentage = numeric ? Math.min(numeric, 10) * 10 : 0
        return (
          <div
            key={label}
            className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-xs uppercase tracking-wide text-white/60"
          >
            <p className="text-[11px] text-white/50">{label}</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${percentage}%`,
                  background: getScoreColor(numeric),
                  boxShadow: `0 0 8px ${getScoreColor(numeric)}40`,
                }}
              />
            </div>
            <p className="mt-1 text-lg font-semibold text-white">
              {numeric !== undefined ? numeric.toFixed(1) : value}
            </p>
          </div>
        )
      })}
    </div>
  )
}

function DetailSection({
  title,
  data,
  emphasize = false,
}: {
  title: string
  data?: SectionBlock
  emphasize?: boolean
}) {
  if (!data) return null

  const hasMeasurements = data.measurements && Object.keys(data.measurements).length > 0

  return (
    <div className="space-y-3 rounded-3xl border border-white/5 bg-neutral-950/30 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">{title}</p>
        {data.shape && (
          <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${emphasize ? "bg-lime-500/20 text-lime-300" : "bg-white/10 text-white/80"}`}>
            {data.shape}
          </span>
        )}
      </div>
      {data.overallComment && <p className="text-sm text-white/80">{data.overallComment}</p>}
      {data.summary && <p className="text-sm text-white/80">{data.summary}</p>}
      {data.description && <p className="text-sm text-white/70">{data.description}</p>}

      {hasMeasurements && (
        <>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 mb-4">Features</p>
          <MeasurementGrid measurements={data.measurements} />
        </>
      )}

      {data.scores && (
        <div className="mt-4 space-y-3">
          {Object.entries(data.scores)
            .filter(([label]) => label !== "Overall") // Exclude Overall score
            .map(([label, value]) => {
              const numeric = parseNumber(value)
              const percentage = numeric ? Math.min(numeric, 10) * 10 : 0
              return (
                <div key={label} className="flex items-center gap-3">
                  <p className="text-[11px] uppercase tracking-wide text-white/50">{label}</p>
                  <div className="flex-1 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        background: getScoreColor(numeric),
                        boxShadow: `0 0 8px ${getScoreColor(numeric)}40`,
                      }}
                    />
                  </div>
                  <p className="text-lg font-semibold text-white">{numeric !== undefined ? numeric.toFixed(1) : value}</p>
                </div>
              )
            })}
        </div>
      )}

      {data.recommendations && (
        <ul className="list-disc space-y-1 pl-4 text-[13px] text-white/70">
          {data.recommendations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function Hero() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisPayload | null>(null)
  const [analysisId, setAnalysisId] = useState<string | null>(null)
  const [analysisStartAt, setAnalysisStartAt] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rawOutput, setRawOutput] = useState<string | null>(null)
  const [leadEmail, setLeadEmail] = useState("")
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadError, setLeadError] = useState<string | null>(null)
  const [leadDialogOpen, setLeadDialogOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const fileInputId = "hero-upload-input"
  const analysisCache = useRef<Map<string, AnalysisPayload>>(new Map())
  const pendingController = useRef<AbortController | null>(null)
  const router = useRouter()
  const isAnalyzing = loading
  const ctaRef = useRef<HTMLDivElement | null>(null)
  const analyticsVariant = ANALYTICS_VARIANT ?? undefined
  const uploadViewTracked = useRef(false)
  const ctaSubmitTracked = useRef<Set<string>>(new Set())

  const analyzeImage = useCallback(async (image: string, force = false) => {
    if (!image) {
      setError("Please upload an image before analyzing.")
      return
    }

    const newAnalysisId = generateAnalysisId()
    setAnalysisId(newAnalysisId)
    setAnalysisStartAt(Date.now())
    setAnalysis(null)
    setRawOutput(null)
    setError(null)
    setLoading(true)
    track("upload_start", {
      site: ANALYTICS_SITE,
      analysis_id: newAnalysisId,
      tool: ANALYTICS_TOOL,
      variant: analyticsVariant,
      startAt: Date.now(),
    })

    if (!force) {
      const cached = analysisCache.current.get(image)
      if (cached) {
        const cachedWithNewId: AnalysisPayload = { ...cached, analysisId: newAnalysisId }
        setAnalysis(cachedWithNewId)
        setRawOutput(cached.raw ?? null)
        setError(null)
        setLoading(false)
        return
      }
    } else {
      analysisCache.current.delete(image)
    }

    pendingController.current?.abort()
    const controller = new AbortController()
    pendingController.current = controller

    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/face-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
        signal: controller.signal,
      })
      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload?.error || "Analysis failed, please try again.")
      }
      const parsed = payload?.parsed
      const result: AnalysisPayload = parsed
        ? { ...parsed, raw: parsed.raw ?? payload?.raw, analysisId: newAnalysisId }
        : { raw: payload?.raw, analysisId: newAnalysisId }
      if (result) {
        analysisCache.current.set(image, result)
      }
      setRawOutput(payload?.raw ?? null)
      setAnalysis(result)
    } catch (err) {
      if ((err as any)?.name === "AbortError") {
        return
      }
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred while analyzing the image."
      setError(message)
    } finally {
      setLoading(false)
      pendingController.current = null
    }
  }, [analyticsVariant])

  const processFile = useCallback(async (file: File | null) => {
    if (!file) return
    setError(null)
    setUploadedUrl(null)
    setPreviewImage(null)
    try {
      const prepared = await resizeImageFile(file, MAX_UPLOAD_SIDE)
      setPreviewImage(prepared.dataUrl)
      setUploadedImage(prepared.dataUrl)
      setAnalysis(null)
      setRawOutput(null)

      setLoading(true)
      const blob = dataUrlToBlob(prepared.dataUrl)
      if (blob.size > MAX_UPLOAD_SIZE) {
        throw new Error("File exceeds the 5 MB limit after compression.")
      }
      const extension = file.name.split(".").pop()
      const fingerprint = getFingerprint()
      const hash = await sha256Hex(blob)

      const { uploadUrl, fileUrl } = await requestUploadInit({
        contentType: blob.type || "image/jpeg",
        extension,
        size: blob.size,
        fingerprint,
        hash,
        width: prepared.width,
        height: prepared.height,
      })

      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": blob.type || "application/octet-stream" },
        body: blob,
      })
      if (!uploadRes.ok) {
        throw new Error("Upload failed. Please try again.")
      }

      setUploadedUrl(fileUrl)
      void analyzeImage(fileUrl)
    } catch (err) {
      console.error("Upload failed", err)
      const message = err instanceof Error ? err.message : "Could not process the image. Please try another photo."
      setError(message)
      setLoading(false)
    }
  }, [analyzeImage])

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setIsDragging(false)
      const file = event.dataTransfer.files[0]
      if (file && file.type.startsWith("image/")) {
        void processFile(file)
      }
    },
    [processFile]
  )

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file && file.type.startsWith("image/")) {
        void processFile(file)
      }
    },
    [processFile]
  )

  const triggerFilePicker = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const clearImage = useCallback(() => {
    setUploadedImage(null)
    setUploadedUrl(null)
    setAnalysis(null)
    setAnalysisId(null)
    setAnalysisStartAt(null)
    setError(null)
    setRawOutput(null)
    setPreviewImage(null)
    setLeadEmail("")
    setLeadError(null)
    setLeadDialogOpen(false)
    ctaSubmitTracked.current.clear()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  const submitLead = useCallback(async () => {
    setLeadError(null)
    const email = leadEmail.trim()
    if (!email) {
      setLeadError("Please enter your email.")
      return
    }
    setLeadSubmitting(true)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, site: "faceshapedetector" }),
      })
      const payload = await res.json()
      if (!res.ok) {
        throw new Error(payload?.error || "Failed to save email")
      }
      setLeadEmail("")
      setLeadDialogOpen(true)
      if (analysisId && !ctaSubmitTracked.current.has(analysisId)) {
        track("cta_submit", {
          site: ANALYTICS_SITE,
          analysis_id: analysisId,
          placement: "inpage",
          variant: analyticsVariant,
          tool: ANALYTICS_TOOL,
        })
        ctaSubmitTracked.current.add(analysisId)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save email"
      setLeadError(message)
    } finally {
      setLeadSubmitting(false)
    }
  }, [leadEmail, analysisId, analyticsVariant])

  const overallScore = analysis?.summary?.overallScore
  const featureRatings = analysis?.summary?.featureRatings
  const overallComment = analysis?.summary?.overallComment
  const [activeDetailTab, setActiveDetailTab] = useState<DetailTabKey>("shape")

  const getFeatureScore = useCallback(
    (label: (typeof summaryFeatureOrder)[number]) => {
      const summaryValue = featureRatings?.[label]
      if (summaryValue !== undefined) {
        const numeric = parseNumber(summaryValue)
        return { display: numeric !== undefined ? numeric.toFixed(1) : String(summaryValue), numeric }
      }

      const sectionMap: Record<string, SectionBlock | undefined> = {
        Eyes: analysis?.eyes,
        Eyebrows: analysis?.brows,
        Lips: analysis?.lips,
        Nose: analysis?.nose,
      }
      const sectionScoreRaw =
        sectionMap[label]?.scores?.Overall ??
        sectionMap[label]?.scores?.overall ??
        sectionMap[label]?.scores?.["overall"] ??
        sectionMap[label]?.scores?.["Overall Score"]
      if (sectionScoreRaw !== undefined) {
        const numeric = parseNumber(sectionScoreRaw)
        return { display: numeric !== undefined ? numeric.toFixed(1) : String(sectionScoreRaw), numeric }
      }

      return { display: undefined, numeric: undefined }
    },
    [analysis, featureRatings]
  )

  const displayImageSrc = previewImage ?? uploadedImage

  useEffect(() => {
    if (uploadViewTracked.current) return
    track("upload_view", { site: ANALYTICS_SITE, placement: "hero_upload", variant: analyticsVariant, tool: ANALYTICS_TOOL })
    uploadViewTracked.current = true
  }, [analyticsVariant])

  useResultView({
    analysisId,
    result: analysis,
    startAt: analysisStartAt,
    variant: analyticsVariant,
    site: ANALYTICS_SITE,
    tool: ANALYTICS_TOOL,
  })

  useSubmitViewInPage({
    targetRef: ctaRef,
    analysisId,
    enabled: !!analysis && !isAnalyzing,
    variant: analyticsVariant,
    site: ANALYTICS_SITE,
    tool: ANALYTICS_TOOL,
  })

  const renderTabContent = () => {
    if (!analysis) {
      return <p className="text-sm text-white/60">Upload a photo to start the analysis.</p>
    }

    if (activeDetailTab === "shape") {
      return (
        <div className="space-y-5">
          <DetailSection
            title="Face Shape"
            data={{
              ...analysis.shape,
              shape: analysis.shape?.faceShape,
              description: analysis.shape?.description,
            }}
            emphasize
          />
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold text-white">Shape probabilities</p>
              <ProbabilityBars data={analysis.shape?.probabilities} />
            </div>
            <MeasurementGrid measurements={analysis.shape?.facialMeasurements} />
          </div>
        </div>
      )
    }

    if (activeDetailTab === "score") {
      const scoreEntries: FeatureScores = {}
      if (overallScore !== undefined) {
        scoreEntries["Overall Score"] = overallScore
      }
      if (featureRatings) {
        Object.entries(featureRatings).forEach(([key, value]) => {
          scoreEntries[key] = value
        })
      }

      if (!Object.keys(scoreEntries).length) {
        return <p className="text-sm text-white/60">Score data is not available yet.</p>
      }

      return (
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/5 bg-white/5 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Score breakdown</p>
            {overallComment && (
              <p className="mt-2 text-sm text-white/70">{overallComment}</p>
            )}
            <ScoreGrid scores={scoreEntries} />
          </div>
        </div>
      )
    }

    const chosenData =
      activeDetailTab === "eyes"
        ? analysis.eyes
        : activeDetailTab === "brows"
        ? analysis.brows
        : activeDetailTab === "lips"
        ? analysis.lips
        : activeDetailTab === "nose"
        ? analysis.nose
        : undefined

    if (!chosenData) {
      return <p className="text-sm text-white/60">Detailed metrics are pending.</p>
    }

    return (
      <>
        {/* Overall Score at top for Eyes/Brows/Lips/Nose tabs */}
        {["eyes", "brows", "lips", "nose"].includes(activeDetailTab) && (
          (() => {
            const featureScoreKey = featureRatingKeyByTab[activeDetailTab]
            const featureScore = featureScoreKey ? getFeatureScore(featureScoreKey as (typeof summaryFeatureOrder)[number]) : undefined
            const tabScoreNumeric =
              featureScore?.numeric ?? (overallScore !== undefined ? overallScore : undefined)
            const featureComment = chosenData?.overallComment ?? overallComment
            const tabScoreDisplay =
              tabScoreNumeric !== undefined
                ? tabScoreNumeric.toFixed(1)
                : featureScore?.display !== undefined
                ? featureScore.display
                : undefined

            if (tabScoreDisplay === undefined) return null

            return (
              <div className="rounded-3xl border border-white/10 bg-neutral-950/30 p-5 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-semibold text-white">Score</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/50">{featureScoreKey ?? "Overall"}</p>
                    <p className="text-3xl font-bold text-lime-300">{tabScoreDisplay}</p>
                  </div>
                </div>
                {featureComment && <p className="text-sm text-white/70 mt-2">{featureComment}</p>}
              </div>
            )
          })()
        )}

        <DetailSection
          title={detailTabConfig.find((tab) => tab.key === activeDetailTab)?.label ?? "Details"}
          data={chosenData}
        />
      </>
    )
  }

  const uploadDropArea = (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`rounded-2xl border border-dashed bg-white/5 p-3 sm:p-6 transition ${
        isDragging ? "border-lime-400 bg-lime-400/10" : "border-white/20"
      }`}
    >
      <label
        htmlFor={fileInputId}
        className="flex flex-col items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-white/70 cursor-pointer"
        onClick={(event) => {
          event.preventDefault()
          triggerFilePicker()
        }}
      >
        <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-lime-300" />
        <span className="hidden sm:block">Drag or click to upload a photo</span>
        <span className="block sm:hidden">Tap to upload a photo</span>
        <span className="text-[10px] sm:text-xs text-white/50">Supports JPG / PNG (max 5MB)</span>
      </label>
    </div>
  )

  const initialLayout = (
    <div className="mx-auto mt-4 grid max-w-5xl gap-4 sm:mt-12 sm:gap-6 lg:gap-4 lg:grid-cols-2 items-stretch justify-center">
      <div className="relative h-full min-h-[280px] sm:min-h-[420px] overflow-hidden">
        <Image
          src="/display.png"
          alt="Face shape detector preview"
          fill
          className="object-contain"
          sizes="(min-width: 1024px) 50vw, 100vw"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div
        id="upload-box"
        className="relative h-full min-h-[280px] sm:min-h-[420px] rounded-[32px] border border-white/10 bg-neutral-900/80 p-4 sm:p-6 backdrop-blur-sm flex flex-col items-center justify-center gap-5 scroll-mt-24 sm:scroll-mt-28"
      >
        <h3 className="mb-2 sm:mb-4 text-center text-xs sm:text-sm font-medium uppercase tracking-wider text-lime-300/80">
          Upload a photo to detect your face shape online
        </h3>
      {uploadDropArea}
      </div>
    </div>
  )

  const analysisLayout = (
    <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      {/* Left Column: Image + AI Face Summary */}
      <div className="space-y-6 rounded-3xl border border-white/10 bg-neutral-900/80 p-6 shadow-2xl shadow-black/40">
        <div
          className="group relative aspect-[3/4] mx-auto max-h-[360px] max-w-[320px] overflow-hidden rounded-3xl border border-white/5"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {displayImageSrc && (
            <Image
              src={displayImageSrc}
              alt="Uploaded face"
              fill
              className="object-contain bg-black"
              priority
              sizes="(min-width: 1024px) 25vw, 80vw"
              style={{ objectFit: "contain" }}
            />
          )}
          {displayImageSrc && loading && (
            <div className="scan-overlay">
              <div className="scan-line" />
              <div className="scan-line scan-line--secondary" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-white/80">Image uploaded — you can analyze or replace it</p>
          <div className="flex gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={triggerFilePicker}
              className="border-white/10 bg-transparent text-white hover:border-white/40"
            >
              Replace photo
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={clearImage}
              className="border-white/10 bg-transparent text-white hover:border-white/40"
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>

        <Button
          className="w-full bg-lime-400 text-black hover:bg-lime-300"
          disabled={!(uploadedUrl || uploadedImage) || loading}
          onClick={() => {
            const target = uploadedUrl || uploadedImage
            if (target) {
              void analyzeImage(target, true)
            }
          }}
        >
          {loading ? "Analyzing..." : analysis ? "Re-run analysis" : "Re-run analysis"}
        </Button>
        {error && <p className="text-sm text-red-400">{error}</p>}

        {/* AI Face Summary - moved below image */}
        {!isAnalyzing && analysis && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">Analysis results</p>
                <p className="text-2xl font-semibold text-white">AI Face Summary</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/50">Overall</p>
                <p className="text-3xl font-bold text-lime-300">{overallScore ? overallScore.toFixed(1) : "--"}</p>
              </div>
            </div>
            {overallComment && <p className="text-sm text-white/70">{overallComment}</p>}
            <div className="grid gap-3 sm:grid-cols-2">
              {summaryFeatureOrder.map((label) => {
                const { display, numeric } = getFeatureScore(label)
                if (display === undefined) return null
                const percentage = numeric ? Math.min(numeric, 10) * 10 : 0
                return (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-xs text-white/60"
                  >
                    <p className="text-[11px] uppercase tracking-wide">{label}</p>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          background: getScoreColor(numeric),
                          boxShadow: `0 0 8px ${getScoreColor(numeric)}40`,
                        }}
                      />
                    </div>
                    <p className="mt-1 text-xl font-semibold text-white">{display}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>

      {/* Right Column: Detail Tabs + Content - moved to top */}
      <div className="space-y-6 rounded-3xl border border-white/10 bg-neutral-950/60 p-6 shadow-2xl shadow-black/40">
        {analysis && !isAnalyzing && (
          <div
            ref={ctaRef}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1b2310] via-[#0f1810] to-[#0a0f0c] p-[1px] shadow-[0_0_30px_-12px_rgba(190,242,100,0.55)]"
          >
            <div className="absolute inset-0 opacity-50 blur-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(190,242,100,0.25),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.2),transparent_30%)]" />
            <div className="relative rounded-3xl border border-lime-400/20 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-lime-400/40 bg-lime-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-200">
                <span className="inline-block h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_10px_rgba(190,242,100,0.8)]" />
                VIP Preview
              </div>
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <p className="text-xl font-bold text-white">Get your personalized styling playbook</p>
                  <p className="text-sm text-white/75">Sent to your inbox with tips tailored to <span className="font-semibold text-lime-200">this result</span>.</p>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-lime-300" />
                      Hairstyles & glasses that flatter your face shape
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-lime-300" />
                      Mistakes to avoid (with quick fixes)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-lime-300" />
                      Priority updates when new features drop
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        void submitLead()
                      }
                    }}
                    placeholder="you@example.com"
                    className="flex-1 rounded-2xl border border-lime-400/30 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300/30"
                  />
                  <Button
                    className="whitespace-nowrap bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-300 text-black hover:from-lime-200 hover:via-lime-300 hover:to-emerald-200 shadow-[0_10px_30px_-12px_rgba(190,242,100,0.7)]"
                    disabled={leadSubmitting || !leadEmail.trim()}
                    onClick={() => void submitLead()}
                  >
                    {leadSubmitting ? "Sending..." : "Email me my result"}
                  </Button>
                </div>
                <p className="text-xs text-white/60">No spam. We only send your tailored tips and product updates.</p>
                {leadError && <p className="text-sm text-red-300">{leadError}</p>}
              </div>
            </div>
          </div>
        )}
        {isAnalyzing ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 py-16 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">analyzing...</p>
            <p className="text-sm text-white/50">Please wait for about 10s...</p>
            <Hourglass className="h-14 w-14 text-white/70 hourglass-spin" />
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {detailTabConfig.map((tab) => {
                  const isActive = tab.key === activeDetailTab
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      className={`rounded-full border border-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.4em] transition ${
                        isActive ? "bg-amber-400 text-black border-amber-400" : "bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                      onClick={() => setActiveDetailTab(tab.key)}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>
              {renderTabContent()}
            </div>
          </>
        )}
      </div>
    </div>
  )

  return (
    <>
      <section
        id="hero"
        className="relative isolate overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black scroll-mt-20"
      >
        <div className="container mx-auto px-4 py-4 sm:py-16">
          {(uploadedImage || previewImage) && (
            <div className="flex justify-start mb-8">
              <button
                type="button"
                onClick={() => {
                  clearImage()
                  router.push("/")
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:border-lime-400 hover:text-lime-200"
              >
                ← Return home
              </button>
            </div>
          )}
          <div className="text-center">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">Male-first face shape detector</p>
            <h1 className="mt-2 sm:mt-6 text-2xl sm:text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Face Shape Detector for Men: Haircuts, Beards, and Glasses
            </h1>
            <p className="mx-auto mt-2 sm:mt-4 max-w-3xl text-sm text-white/70 sm:text-base lg:text-lg">
              Upload a clear photo to detect your face shape from a selfie, then use the result to choose better men&apos;s haircuts, beard styles, and glasses without guessing.
            </p>
          </div>
          <input
            id={fileInputId}
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileSelect}
            className="hidden"
          />
          {uploadedImage ? analysisLayout : initialLayout}
        </div>
      </section>
      {leadDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-neutral-900/95 p-6 shadow-2xl shadow-black/50">
            <p className="text-lg font-semibold text-white">Thanks for helping us shape this feature 👋</p>
            <div className="mt-3 space-y-3 text-sm text-white/75">
              <p>We’re validating demand for more detailed face shape analysis and style recommendations.</p>
              <p>Your interest helps us decide what to build next and which features matter most.</p>
              <p>If we move forward with this, you’ll be the first to know.</p>
              <p className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                No newsletters. No spam. Just product updates.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                className="bg-lime-400 text-black hover:bg-lime-300"
                onClick={() => setLeadDialogOpen(false)}
              >
                Sounds good
              </Button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .scan-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          overflow: hidden;
          background: radial-gradient(circle at 50% 50%, rgba(163, 230, 53, 0.1), transparent 55%);
        }

        .scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(180deg, transparent, rgba(163, 230, 53, 1), transparent);
          box-shadow: 0 0 30px rgba(163, 230, 53, 0.6), 0 0 60px rgba(163, 230, 53, 0.4);
          animation: scanMotion 2.4s linear infinite;
        }

        .scan-line--secondary {
          animation-delay: 1.1s;
          opacity: 0.6;
        }

        @keyframes scanMotion {
          0% {
            transform: translateY(-120%);
          }
          100% {
            transform: translateY(120%);
          }
        }

        .hourglass-spin {
          animation: hourglassRotate 1.4s linear infinite;
        }

        @keyframes hourglassRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  )
}

