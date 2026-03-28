"use client"

import { useEffect, useRef, useState } from "react"

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

type ScrollMetrics = {
  viewportHeight: number
  scrollTop: number
  scrollHeight: number
  maxScroll: number
}

function getMetricsFromElement(el: HTMLElement): ScrollMetrics {
  const viewportHeight = el.clientHeight
  const scrollTop = el.scrollTop
  const scrollHeight = el.scrollHeight
  return {
    viewportHeight,
    scrollTop,
    scrollHeight,
    maxScroll: Math.max(0, scrollHeight - viewportHeight),
  }
}

function getWindowMetrics() {
  const doc = document.documentElement
  const body = document.body

  const viewportHeight = window.innerHeight
  const scrollTop = Math.max(window.scrollY, doc.scrollTop, body.scrollTop, 0)
  const scrollHeight = Math.max(
    doc.scrollHeight,
    body.scrollHeight,
    doc.offsetHeight,
    body.offsetHeight,
    doc.clientHeight,
    body.clientHeight,
  )

  return {
    viewportHeight,
    scrollTop,
    scrollHeight,
    maxScroll: Math.max(0, scrollHeight - viewportHeight),
  }
}

function getBestScrollableElement(): HTMLElement | null {
  const doc = document.documentElement
  const body = document.body
  const boundary = document.querySelector("[data-nextjs-scroll-focus-boundary]") as HTMLElement | null
  const main = document.querySelector("main") as HTMLElement | null
  const candidates = [
    document.scrollingElement as HTMLElement | null,
    doc,
    body,
    boundary,
    main,
  ].filter((item): item is HTMLElement => Boolean(item))

  let best: HTMLElement | null = null
  let bestScrollableSize = 0

  for (const candidate of candidates) {
    const scrollableSize = candidate.scrollHeight - candidate.clientHeight
    if (scrollableSize > bestScrollableSize) {
      bestScrollableSize = scrollableSize
      best = candidate
    }
  }

  return bestScrollableSize > 0 ? best : null
}

function isRootScroller(el: HTMLElement | null) {
  if (!el) return true
  return el === document.documentElement || el === document.body || el === document.scrollingElement
}

function setScrollerScrollTop(scroller: HTMLElement | null, top: number) {
  const safeTop = Math.max(0, top)
  const doc = document.documentElement
  const body = document.body
  const best = getBestScrollableElement()

  // Always try root scrolling first.
  window.scrollTo(0, safeTop)
  doc.scrollTop = safeTop
  body.scrollTop = safeTop

  // Then update detected scroll container(s).
  if (scroller && !isRootScroller(scroller)) {
    scroller.scrollTop = safeTop
  }
  if (best && !isRootScroller(best) && best !== scroller) {
    best.scrollTop = safeTop
  }
}

export function ScrollProgressIndicator() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const draggingRef = useRef(false)
  const dragStartYRef = useRef(0)
  const dragStartThumbTopRef = useRef(0)
  const activeScrollerRef = useRef<HTMLElement | null>(null)
  const [thumbTop, setThumbTop] = useState(0)
  const [thumbHeight, setThumbHeight] = useState(84)
  const [active, setActive] = useState(false)

  useEffect(() => {
    let frameId = 0

    const update = () => {
      const trackEl = trackRef.current
      if (!trackEl) return

      const scroller = activeScrollerRef.current ?? getBestScrollableElement()
      const metrics = scroller ? getMetricsFromElement(scroller) : getWindowMetrics()
      const { viewportHeight, scrollHeight, scrollTop, maxScroll } = metrics
      const trackHeight = trackEl.clientHeight

      if (trackHeight <= 0) return

      if (maxScroll === 0) {
        const idleHeight = clamp(Math.round(trackHeight * 0.25), 48, 160)
        setThumbHeight(idleHeight)
        setThumbTop(0)
        setActive(false)
        return
      }

      const minThumbHeight = 40
      const maxThumbHeight = Math.min(180, Math.round(trackHeight * 0.45))
      const ratio = viewportHeight / scrollHeight
      const proportionalThumb = Math.round(trackHeight * ratio)
      const nextThumbHeight = clamp(proportionalThumb, minThumbHeight, maxThumbHeight)
      const travel = Math.max(0, trackHeight - nextThumbHeight)
      const progress = clamp(scrollTop / maxScroll, 0, 1)

      setThumbHeight(nextThumbHeight)
      setThumbTop(progress * travel)
      setActive(true)
    }

    const requestUpdate = () => {
      cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(update)
    }

    const onScrollCapture = (event: Event) => {
      const target = event.target
      if (target instanceof HTMLElement) {
        const scrollableSize = target.scrollHeight - target.clientHeight
        if (scrollableSize > 0) {
          activeScrollerRef.current = target
        }
      }
      requestUpdate()
    }

    activeScrollerRef.current = getBestScrollableElement()
    requestUpdate()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    document.addEventListener("scroll", onScrollCapture, { passive: true, capture: true })
    window.addEventListener("resize", requestUpdate)
    const resizeObserver = new ResizeObserver(requestUpdate)
    resizeObserver.observe(document.documentElement)
    resizeObserver.observe(document.body)

    return () => {
      window.removeEventListener("scroll", requestUpdate)
      document.removeEventListener("scroll", onScrollCapture, true)
      window.removeEventListener("resize", requestUpdate)
      resizeObserver.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!draggingRef.current) return

      const trackEl = trackRef.current
      if (!trackEl) return

      const fallbackScroller = getBestScrollableElement()
      const trackedScroller = activeScrollerRef.current
      const scroller =
        trackedScroller && trackedScroller.scrollHeight > trackedScroller.clientHeight
          ? trackedScroller
          : fallbackScroller
      const metrics = scroller ? getMetricsFromElement(scroller) : getWindowMetrics()
      const trackHeight = trackEl.clientHeight
      const travel = Math.max(0, trackHeight - thumbHeight)
      if (travel <= 0 || metrics.maxScroll <= 0) return

      const deltaY = event.clientY - dragStartYRef.current
      const nextThumbTop = clamp(dragStartThumbTopRef.current + deltaY, 0, travel)
      const progress = nextThumbTop / travel
      const nextScrollTop = progress * metrics.maxScroll

      setThumbTop(nextThumbTop)
      setScrollerScrollTop(scroller, nextScrollTop)
    }

    const stopDragging = () => {
      if (!draggingRef.current) return
      draggingRef.current = false
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerup", stopDragging)
    window.addEventListener("pointercancel", stopDragging)

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", stopDragging)
      window.removeEventListener("pointercancel", stopDragging)
    }
  }, [thumbHeight])

  const handleThumbPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    draggingRef.current = true
    dragStartYRef.current = event.clientY
    dragStartThumbTopRef.current = thumbTop
    document.body.style.userSelect = "none"
    document.body.style.cursor = "ns-resize"
  }

  return (
    <div className="fixed inset-y-0 right-0 z-[9999] w-5 py-4 flex justify-center">
      <div
        ref={trackRef}
        className="pointer-events-none relative h-full w-[4px] rounded-full bg-white/30"
      />
      <div
        onPointerDown={handleThumbPointerDown}
        className="absolute right-[6px] w-[8px] cursor-ns-resize rounded-full bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.7)] transition-opacity duration-75"
        style={{
          top: "16px",
          height: `${thumbHeight}px`,
          transform: `translateY(${thumbTop}px)`,
          opacity: active ? 1 : 0.55,
        }}
      />
    </div>
  )
}
