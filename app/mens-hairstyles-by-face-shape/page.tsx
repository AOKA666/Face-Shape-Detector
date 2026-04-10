import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { FaceDetectorCTA } from "@/components/face-detector-cta"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Men's Hairstyles by Face Shape | Best Haircuts for Men",
  description:
    "Explore men's hairstyles by face shape and find the best haircuts for oval, round, square, oblong, heart, and diamond face shapes.",
  alternates: {
    canonical: "https://www.yourface.online/mens-hairstyles-by-face-shape",
  },
}

const faceShapeCards = [
  {
    name: "Oval",
    summary: "Balanced and versatile, but too much height on top can over-elongate the face.",
    best: ["Textured crop", "Ivy League", "Low quiff", "Side part"],
    avoid: ["Extra-tall pompadour", "Ultra-high skin fade"],
    links: [
      { href: "/blog/best-hairstyles-for-oval-face-shape", label: "Best hairstyles for oval face shape" },
      { href: "/blog/worst-haircuts-for-oval-faces-male", label: "Worst haircuts for oval faces male" },
    ],
  },
  {
    name: "Round",
    summary: "The main job is adding definition and avoiding styles that make the face look wider.",
    best: ["Textured quiff", "Side part", "Angular crop", "Taper fade"],
    avoid: ["Heavy fringe", "Wide bowl-like shapes"],
    links: [{ href: "/blog/best-hairstyles-for-round-face-shape", label: "Best hairstyles for round face shape" }],
  },
  {
    name: "Square",
    summary: "Strong jawlines can carry structured cuts well, as long as the style does not get too blocky.",
    best: ["Textured crop", "Crew cut", "Side-swept styles", "Short quiff"],
    avoid: ["Overly boxy, stiff shapes"],
    links: [{ href: "/blog/best-hairstyles-for-square-face-shape", label: "Best hairstyles for square face shape" }],
  },
  {
    name: "Oblong",
    summary: "Reduce vertical emphasis. Too much top height usually makes this face shape look longer.",
    best: ["Crew cut", "Textured fringe", "Medium layers", "Classic side part"],
    avoid: ["Tall pompadours", "High fades with height"],
    links: [{ href: "/blog/best-hairstyles-for-oblong-face-shape", label: "Best hairstyles for oblong face shape" }],
  },
  {
    name: "Heart",
    summary: "Balance a wider forehead with styles that add texture and support through the lower face.",
    best: ["Textured fringe", "Medium layers", "Tapered side part"],
    avoid: ["Extreme volume on top"],
    links: [{ href: "/blog/best-hairstyles-for-heart-face-shape", label: "Best hairstyles for heart face shape" }],
  },
  {
    name: "Diamond",
    summary: "Keep cheekbones from dominating by using texture and width through the forehead or jaw area.",
    best: ["Side-swept fringe", "Textured crop", "Medium-length layers"],
    avoid: ["Overly tight sides with flat top"],
    links: [{ href: "/blog/best-hairstyles-for-diamond-face-shape", label: "Best hairstyles for diamond face shape" }],
  },
]

export default function MensHairstylesByFaceShapePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.yourface.online/mens-hairstyles-by-face-shape#collection",
    url: "https://www.yourface.online/mens-hairstyles-by-face-shape",
    name: "Men's Hairstyles by Face Shape",
    description:
      "Explore men's hairstyles by face shape and find the best haircuts for oval, round, square, oblong, heart, and diamond face shapes.",
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <header className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime-300">Male-first haircut hub</p>
            <h1 className="mt-4 text-3xl font-bold sm:text-5xl">Men&apos;s Hairstyles by Face Shape</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-300 sm:text-base">
              Use your face shape as the starting point for haircut decisions. The goal is not to copy trends blindly. It is to choose cuts that keep your proportions balanced, your features sharper, and your daily styling easier.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-300">
              <Link href="/face-shape-detector-for-men" className="rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-2 text-lime-300 hover:bg-lime-300/15">Check your face shape first</Link>
              <Link href="/beard-styles-by-face-shape" className="rounded-full border border-white/15 px-4 py-2 hover:border-lime-300/40 hover:text-lime-300">See beard styles by face shape</Link>
            </div>
          </header>

          <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {faceShapeCards.map((shape) => (
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

                <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                  {shape.links.map((link) => (
                    <Link key={link.href} href={link.href} className="block text-sm font-medium text-lime-300 hover:text-lime-200">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <FaceDetectorCTA
            title="Still unsure which face shape you have?"
            description="Run a quick analysis before choosing a crop, fade, side part, pompadour, or beard shape. Wrong face shape assumption is where most bad haircut decisions begin."
            ctaText="Use the Face Shape Detector for Men"
            href="/face-shape-detector-for-men"
          />
        </section>
        <AppverseFooter />
      </main>
      <Script
        id="mens-hairstyles-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  )
}
