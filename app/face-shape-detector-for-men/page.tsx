import { SiteHeader } from "@/components/site-header"
import { HeroMen } from "./_components/hero-men"
import { CommonMaleFaceShapes } from "./_components/common-male-face-shapes"
import { HairstylesByFaceShapeMen } from "./_components/hairstyles-by-face-shape-men"
import { WhyFaceShapeMattersMen } from "./_components/why-face-shape-matters-men"
import { InternalLinksMen } from "./_components/internal-links-men"
import { FAQMen } from "./_components/faq-men"
import { AppverseFooter } from "@/components/appverse-footer"
import { FaceDetectorCTA } from "@/components/face-detector-cta"
import Script from "next/script"
import type { Metadata } from "next"

// Force static generation for low TTFB
export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Face Shape Detector for Men | Find the Best Cut & Style",
  description:
    "Use our AI face shape detector for men for more accurate face shape analysis and discover better hairstyles, beard styles, and glasses choices.",
  alternates: {
    canonical: "https://www.yourface.online/face-shape-detector-for-men",
  },
}

export default function MenPage() {
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.yourface.online/face-shape-detector-for-men",
    name: "Face Shape Detector for Men | Find the Best Cut & Style",
    description:
      "Use our AI face shape detector for men for more accurate face shape analysis and discover better hairstyles, beard styles, and glasses choices.",
    url: "https://www.yourface.online/face-shape-detector-for-men",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this accurate for men with beards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Facial hair can change the visual outline of your jaw, but our tool can still help you identify the underlying face shape. For the cleanest read, upload a photo with lighter beard growth first, then use beard style guides as a second step.",
        },
      },
      {
        "@type": "Question",
        name: "What haircut suits an oval face male best?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oval faces usually do best with controlled volume, natural texture, and balanced sides. Textured crops, side parts, Ivy League cuts, and low quiffs are usually safer than extra-tall pompadours or ultra-tight fades.",
        },
      },
      {
        "@type": "Question",
        name: "Does a beard make your face look longer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It can. Pointed or chin-heavy beard shapes usually add vertical length, while wider and more controlled beard shapes can add balance. That matters a lot for oblong, round, and oval faces.",
        },
      },
    ],
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <HeroMen />
        <CommonMaleFaceShapes />
        <HairstylesByFaceShapeMen />
        <WhyFaceShapeMattersMen />
        <section className="mx-auto max-w-6xl px-4">
          <FaceDetectorCTA
            title="Upload a Photo to Detect Your Face Shape"
            description="Use the AI face shape detector to choose better men's haircuts, beard shapes, and glasses with less guesswork."
            ctaText="Try the Face Shape Detector"
            href="/face-shape-detector-online"
          />
          <FaceDetectorCTA
            title="Need Haircut Ideas by Face Shape?"
            description="Go straight to the men's haircut hub if you already know your face shape and want faster style direction."
            ctaText="Browse Men's Haircuts by Face Shape"
            href="/mens-hairstyles-by-face-shape"
          />
        </section>
        <InternalLinksMen />
        <FAQMen />
        <AppverseFooter />
      </main>

      {/* JSON-LD structured data */}
      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />

      <Script
        id="faq-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
    </>
  )
}
