"use client"

import { useCallback, useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"

import { Slider } from "@/components/ui/slider"

function getMaxScrollTop() {
  const doc = document.documentElement
  return Math.max(0, doc.scrollHeight - window.innerHeight)
}

export function BackToTopControl() {
  const [progress, setProgress] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [maxScrollTop, setMaxScrollTop] = useState(0)

  const syncFromScroll = useCallback(() => {
    const max = getMaxScrollTop()
    const top = window.scrollY || 0

    setMaxScrollTop(max)
    setShowButton(top > 260)
    setProgress(max > 0 ? Math.min(100, (top / max) * 100) : 0)
  }, [])

  useEffect(() => {
    syncFromScroll()

    window.addEventListener("scroll", syncFromScroll, { passive: true })
    window.addEventListener("resize", syncFromScroll)

    return () => {
      window.removeEventListener("scroll", syncFromScroll)
      window.removeEventListener("resize", syncFromScroll)
    }
  }, [syncFromScroll])

  const handleSliderChange = (values: number[]) => {
    const next = values[0] ?? 0
    setProgress(next)

    if (maxScrollTop <= 0) {
      return
    }

    const nextTop = (next / 100) * maxScrollTop
    window.scrollTo({ top: nextTop, behavior: "auto" })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (maxScrollTop <= 0) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-4 z-[70] flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-2 backdrop-blur-md">
      <Slider
        value={[progress]}
        min={0}
        max={100}
        step={1}
        onValueChange={handleSliderChange}
        aria-label="Page scroll progress"
        className="w-28"
      />
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-white/20 ${
          showButton ? "opacity-100" : "opacity-60"
        }`}
      >
        <ChevronUp className="h-4 w-4" />
      </button>
    </div>
  )
}
