import { SiteHeader } from "@/components/site-header"
import { Intro } from "./_components/intro"
import { FaceShapeTypesExplained } from "./_components/face-shape-types-explained"
import { HowToFindFaceShape } from "./_components/how-to-find-face-shape"
import { ToolCTA } from "./_components/tool-cta"
import { CommonMistakes } from "./_components/common-mistakes"
import { InternalLinks } from "./_components/internal-links"
import { FAQ } from "./_components/faq"
import { AppverseFooter } from "@/components/appverse-footer"
import { FaceDetectorCTA } from "@/components/face-detector-cta"
import Script from "next/script"
import type { Metadata } from "next"

// Force static generation for low TTFB
export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "What Face Shape Do I Have? | Free AI Face Shape Test",
  description:
    "Not sure what face shape you have? Upload a photo or learn the key measurements to identify your face shape quickly and accurately.",
  alternates: {
    canonical: "https://www.yourface.online/what-face-shape-do-i-have",
  },
}

export default function WhatFaceShapePage() {
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.yourface.online/what-face-shape-do-i-have",
    name: "What Face Shape Do I Have? | Free AI Face Shape Test",
    description:
      "Not sure what face shape you have? Upload a photo or learn the key measurements to identify your face shape quickly and accurately.",
    url: "https://www.yourface.online/what-face-shape-do-i-have",
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
        name: "Can face shape change?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your basic bone structure remains the same throughout life. However, factors like aging, weight changes, and facial hair can alter how your face shape appears. You may notice subtle changes over time, but your fundamental face shape type stays consistent.",
        },
      },
      {
        "@type": "Question",
        name: "Is face shape genetic?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, face shape is largely determined by genetics. Your bone structure, jawline, and facial proportions are inherited from your parents. While lifestyle factors can affect appearance, your basic face shape is primarily genetic.",
        },
      },
    ],
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <Intro />
        <FaceShapeTypesExplained />
        <HowToFindFaceShape />
        <ToolCTA />
        <section className="mx-auto max-w-6xl px-4">
          <FaceDetectorCTA
            title="Find Your Face Shape Online"
            description="Upload a clear photo and use AI to confirm your face shape before choosing haircut, beard, or glasses styles."
            ctaText="Try the Face Shape Detector"
            href="/face-shape-detector-online"
          />
        </section>
        <CommonMistakes />
        <InternalLinks />
        <FAQ />
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
