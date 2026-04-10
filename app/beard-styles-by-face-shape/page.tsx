import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { FaceDetectorCTA } from "@/components/face-detector-cta"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Best Beard Styles by Face Shape | Men's Beard Guide",
  description:
    "Find the best beard styles by face shape for men and learn how beard length, width, and outline affect facial balance.",
  alternates: {
    canonical: "https://www.yourface.online/beard-styles-by-face-shape",
  },
}

const beardCards = [
  {
    name: "Oval",
    summary: "Most beard styles work, but very long pointed shapes can make the face look too long.",
    best: ["Short boxed beard", "Heavy stubble", "Neat full beard"],
    avoid: ["Long pointed beard"],
  },
  {
    name: "Round",
    summary: "Use beard shape to add structure and reduce visual width through the cheeks.",
    best: ["Angular boxed beard", "Extended goatee", "Chin-focused beard"],
    avoid: ["Big cheek-heavy beard"],
  },
  {
    name: "Square",
    summary: "Strong jawlines already carry structure, so the beard should refine rather than overbuild it.",
    best: ["Short full beard", "Designer stubble", "Rounded full beard"],
    avoid: ["Ultra-boxy heavy beard"],
  },
  {
    name: "Oblong",
    summary: "Avoid adding too much vertical length at the chin. Width matters more here.",
    best: ["Heavy stubble", "Short boxed beard", "Wider full beard"],
    avoid: ["Pointed goatee", "Long bottom-heavy beard"],
  },
  {
    name: "Heart",
    summary: "Beard can add useful weight to a narrower chin and balance a wider forehead.",
    best: ["Short boxed beard", "Moderate full beard", "Chin-supporting beard"],
    avoid: ["Bare-chin styles that keep the jaw too narrow"],
  },
  {
    name: "Diamond",
    summary: "Support the jaw without adding extra volume to the cheeks.",
    best: ["Short boxed beard", "Heavy stubble", "Jaw-focused beard"],
    avoid: ["Excess cheek volume"],
  },
]

export default function BeardStylesByFaceShapePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.yourface.online/beard-styles-by-face-shape#collection",
    url: "https://www.yourface.online/beard-styles-by-face-shape",
    name: "Best Beard Styles by Face Shape",
    description:
      "Find the best beard styles by face shape for men and learn how beard length, width, and outline affect facial balance.",
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <header className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime-300">Male grooming hub</p>
            <h1 className="mt-4 text-3xl font-bold sm:text-5xl">Best Beard Styles by Face Shape</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-300 sm:text-base">
              Beard styling is not random facial hair optimism. The right beard can add width, reduce length, sharpen the jawline, or rebalance the lower face. The wrong one does the exact opposite.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-300">
              <Link href="/face-shape-detector-for-men" className="rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-2 text-lime-300 hover:bg-lime-300/15">Check your face shape first</Link>
              <Link href="/mens-hairstyles-by-face-shape" className="rounded-full border border-white/15 px-4 py-2 hover:border-lime-300/40 hover:text-lime-300">See men's haircuts by face shape</Link>
            </div>
          </header>

          <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {beardCards.map((shape) => (
              <article key={shape.name} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h2 className="text-2xl font-semibold text-white">{shape.name} Face Shape</h2>
                <p className="mt-3 text-sm leading-7 text-neutral-300">{shape.summary}</p>

                <div className="mt-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-lime-300">Usually works</h3>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                    {shape.best.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-rose-300">Usually avoid</h3>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                    {shape.avoid.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <Link href="/blog/best-beard-styles-for-your-face-shape" className="text-sm font-medium text-lime-300 hover:text-lime-200">
                    Read the full beard guide
                  </Link>
                </div>
              </article>
            ))}
          </section>

          <FaceDetectorCTA
            title="Use face shape first, then trim"
            description="Before copying a beard trend, confirm whether your face is oval, round, square, oblong, heart, or diamond. That single step saves a lot of bad grooming decisions."
            ctaText="Try the Face Shape Detector for Men"
            href="/face-shape-detector-for-men"
          />
        </section>
        <AppverseFooter />
      </main>
      <Script
        id="beard-styles-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  )
}
