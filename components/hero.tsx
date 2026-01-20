"use client"

import Image from "next/image"
import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import { track } from "@/lib/analytics"

type FeatureScores = Record<string, number | string>

interface SectionBlock {
  shape?: string
  description?: string
  summary?: string
  measurements?: Record<string, string>
  facialMeasurements?: Record<string, string>
  scores?: FeatureScores
  probabilities?: Record<string, number | string>
  recommendations?: string[]
}

interface AnalysisPayload {
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

const probabilityKeyOrder = ["Square", "Round", "Diamond", "Heart", "Oblong", "Oval"]

async function resizeImageFile(file: File, maxSide = 512): Promise<string> {
  const bitmap = await createImageBitmap(file)
  const longest = Math.max(bitmap.width, bitmap.height)
  if (longest <= maxSide) {
    const canvas = document.createElement("canvas")
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
      ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
    }
    bitmap.close()
    return canvas.toDataURL("image/jpeg", 0.95)
  }
  const ratio = maxSide / longest
  const width = Math.max(1, Math.round(bitmap.width * ratio))
  const height = Math.max(1, Math.round(bitmap.height * ratio))

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(bitmap, 0, 0, width, height)
  }
  bitmap.close()

  return canvas.toDataURL("image/jpeg", 0.95)
}

function parseNumber(value: number | string | undefined): number | undefined {
  if (value === undefined || value === null) return undefined
  if (typeof value === "number") return value
  const parsed = parseFloat(String(value).replace("%", "").trim())
  return Number.isFinite(parsed) ? parsed : undefined
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
        return (
          <div
            key={label}
            className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-xs uppercase tracking-wide text-white/60"
          >
            <p className="text-[11px] text-white/50">{label}</p>
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
      {data.summary && <p className="text-sm text-white/80">{data.summary}</p>}
      {data.description && <p className="text-sm text-white/70">{data.description}</p>}
      <MeasurementGrid measurements={data.measurements} />
      <ScoreGrid scores={data.scores} />
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
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisPayload | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rawOutput, setRawOutput] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const fileInputId = "hero-upload-input"
  const analysisCache = useRef<Map<string, AnalysisPayload>>(new Map())
  const pendingController = useRef<AbortController | null>(null)

  const processFile = useCallback(async (file: File | null) => {
    if (!file) return
    setError(null)
    setPreviewImage(null)
    const reader = new FileReader()
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)

    try {
      const resized = await resizeImageFile(file, 512)
      setUploadedImage(resized)
      setAnalysis(null)
      setRawOutput(null)
      track("upload_start", { site: "faceshapedetector" })
      void analyzeImage(resized)
    } catch {
      setError("Could not process the image. Please try another photo.")
    }
  }, [])

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
    setAnalysis(null)
    setError(null)
    setRawOutput(null)
    setPreviewImage(null)
  }, [])

  const analyzeImage = useCallback(async (image: string) => {
    if (!image) {
      setError("Please upload an image before analyzing.")
      return
    }

    const cached = analysisCache.current.get(image)
    if (cached) {
      setAnalysis(cached)
      setRawOutput(cached.raw ?? null)
      setError(null)
      setLoading(false)
      return
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
        ? { ...parsed, raw: parsed.raw ?? payload?.raw }
        : { raw: payload?.raw }
      if (result) {
        analysisCache.current.set(image, result)
        track("result_view", { site: "faceshapedetector" })
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
  }, [])

  const overallScore = analysis?.summary?.overallScore
  const featureRatings = analysis?.summary?.featureRatings
  const overallComment = analysis?.summary?.overallComment
  const [activeDetailTab, setActiveDetailTab] = useState<DetailTabKey>("shape")

  const displayImageSrc = previewImage ?? uploadedImage

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
      <DetailSection
        title={detailTabConfig.find((tab) => tab.key === activeDetailTab)?.label ?? "Details"}
        data={chosenData}
      />
    )
  }

  const uploadDropArea = (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`rounded-2xl border border-dashed bg-white/5 p-6 transition ${isDragging ? "border-lime-400 bg-lime-400/10" : "border-white/20"}`}
    >
      <label
        htmlFor={fileInputId}
        className="flex flex-col items-center justify-center gap-2 text-sm font-medium text-white/70 cursor-pointer"
      >
        <Upload className="h-10 w-10 text-lime-300" />
        <span>Drag or click to upload a photo</span>
        <span className="text-xs text-white/50">Supports JPG / PNG / WebP</span>
      </label>
    </div>
  )

  const initialLayout = (
    <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="relative min-h-[420px] overflow-hidden rounded-[32px] border border-white/10 bg-neutral-900/80">
        <Image
          src="/display.png"
          alt="Face shape detector preview"
          fill
          className="rounded-[32px] object-contain bg-black"
          sizes="(min-width: 1024px) 50vw, 100vw"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="relative rounded-[32px] border border-white/10 bg-neutral-900/80 p-6 backdrop-blur-sm">
        <h3 className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-lime-300/80">
          Upload a photo to get your analysis
        </h3>
        {uploadDropArea}
      </div>
    </div>
  )

  const analysisLayout = (
    <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
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
          disabled={!uploadedImage || loading}
          onClick={() => uploadedImage && analyzeImage(uploadedImage)}
        >
          {loading ? "Analyzing..." : analysis ? "Re-run analysis" : "Re-run analysis"}
        </Button>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>

      <div className="space-y-6 rounded-3xl border border-white/10 bg-neutral-950/60 p-6 shadow-2xl shadow-black/40">
        <div className="flex flex-col gap-3">
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
            {featureRatings &&
              Object.entries(featureRatings).map(([label, value]) => {
                const numeric = parseNumber(value)
                return (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-xs text-white/60"
                  >
                    <p className="text-[11px] uppercase tracking-wide">{label}</p>
                    <p className="mt-1 text-xl font-semibold text-white">
                      {numeric !== undefined ? numeric.toFixed(1) : value}
                    </p>
                  </div>
                )
              })}
          </div>
        </div>

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

      </div>
    </div>
  )

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">Face Intelligence</p>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Reimagining facial insights with AI
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
            Upload one photo to unlock multidimensional facial scores, measurements, and aesthetic tips; layout mirrors the reference for easy web presentation.
          </p>
        </div>
        <input
          id={fileInputId}
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
        {uploadedImage ? analysisLayout : initialLayout}
      </div>
    </section>
  )
}
