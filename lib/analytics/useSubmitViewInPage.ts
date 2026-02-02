import { useEffect, useRef, type RefObject } from "react"
import { track } from "../analytics"

type Params = {
  targetRef: RefObject<Element | null>
  analysisId: string | null
  variant?: string
  site?: string
  tool?: string
}

const VISIBLE_THRESHOLD = 0.5
const STABLE_MS = 800

/**
 * Fires `submit_view` once per analysisId when the CTA card is stably visible in viewport.
 */
export function useSubmitViewInPage({
  targetRef,
  analysisId,
  variant,
  site = "yourface.online",
  tool = "face_shape",
}: Params) {
  const firedIdsRef = useRef<Set<string>>(new Set())
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const el = targetRef.current
    if (!el || !analysisId) return

    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }

    const handleEntries: IntersectionObserverCallback = (entries) => {
      const entry = entries[0]
      if (!entry) return
      if (firedIdsRef.current.has(analysisId)) {
        clearTimer()
        return
      }

      const isVisible = entry.isIntersecting && entry.intersectionRatio >= VISIBLE_THRESHOLD
      if (isVisible) {
        if (!timerRef.current) {
          timerRef.current = setTimeout(() => {
            if (firedIdsRef.current.has(analysisId)) return
            const payload: Record<string, any> = {
              site,
              placement: "inpage",
              analysis_id: analysisId,
            }
            if (variant) payload.variant = variant
            if (tool) payload.tool = tool
            track("submit_view", payload)
            firedIdsRef.current.add(analysisId)
          }, STABLE_MS)
        }
      } else {
        clearTimer()
      }
    }

    observerRef.current = new IntersectionObserver(handleEntries, {
      threshold: [VISIBLE_THRESHOLD],
    })
    observerRef.current.observe(el)

    return () => {
      clearTimer()
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [analysisId, targetRef, variant, site, tool])
}
