import { useEffect, useRef } from "react"
import { track } from "../analytics"

type ResultLike = {
  shape?: {
    faceShape?: string
    face_shape?: string
    shape?: string
  }
}

type Params = {
  analysisId: string | null
  result: ResultLike | null
  startAt: number | null
  variant?: string
  site?: string
  tool?: string
}

/**
 * Fires `result_view` once per analysisId after result is present & rendered.
 */
export function useResultView({
  analysisId,
  result,
  startAt,
  variant,
  site = "yourface.online",
  tool = "face_shape",
}: Params) {
  const firedIdsRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (!analysisId || !result) return
    if (firedIdsRef.current.has(analysisId)) return

    const resultType =
      result.shape?.faceShape ||
      result.shape?.face_shape ||
      result.shape?.shape ||
      undefined
    if (!resultType) return

    const payload: Record<string, any> = {
      site,
      tool,
      result_type: resultType,
      analysis_id: analysisId,
    }

    if (typeof startAt === "number") {
      payload.latency_ms = Math.max(0, Date.now() - startAt)
    }
    if (variant) {
      payload.variant = variant
    }

    track("result_view", payload)
    firedIdsRef.current.add(analysisId)
  }, [analysisId, result, startAt, variant, site, tool])
}
