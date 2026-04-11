import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { WhyChooseUs } from "@/components/why-choose-us"
import { HowToUse } from "@/components/how-to-use"
import { LearnMore } from "@/components/learn-more"
import { FaceShapesExplained } from "@/components/face-shapes-explained"
import { StylingByUseCase } from "@/components/styling-by-use-case"
import { FAQSection } from "@/components/faq-section"
import { AppverseFooter } from "@/components/appverse-footer"
import { FaceDetectorCTA } from "@/components/face-detector-cta"
import Script from "next/script"
import type { Metadata } from "next"

// Force static generation for low TTFB
export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Face Shape Detector for Men | Free AI Haircut & Beard Guide",
  description:
    "Use a free AI face shape detector for men for more accurate face shape analysis from a selfie. Identify oval, round, square, heart, diamond, or oblong face shape and get men's haircut, beard, and glasses guidance.",
  alternates: {
    canonical: "https://www.yourface.online/",
  },
  openGraph: {
    type: "website",
    url: "https://www.yourface.online/",
    title: "Face Shape Detector for Men | Free AI Haircut & Beard Guide",
    description:
      "Use a free AI face shape detector for men for more accurate face shape analysis from a selfie. Identify oval, round, square, heart, diamond, or oblong face shape and get men's haircut, beard, and glasses guidance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Face Shape Detector for Men | Free AI Haircut & Beard Guide",
    description:
      "Use a free AI face shape detector for men for more accurate face shape analysis from a selfie. Identify oval, round, square, heart, diamond, or oblong face shape and get men's haircut, beard, and glasses guidance.",
  },
}

export default function Page() {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.yourface.online/#website",
    url: "https://www.yourface.online/",
    name: "YourFace Online",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.yourface.online/blog?query={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  const webPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.yourface.online/#webpage",
    url: "https://www.yourface.online/",
    name: "Face Shape Detector for Men | Free AI Haircut & Beard Guide",
    description:
      "Use our free male-first face shape detector online for more accurate face shape analysis from a clear photo, then choose better men's haircut, beard, and glasses direction in seconds.",
    isPartOf: {
      "@id": "https://www.yourface.online/#website",
    },
  }

  const appStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.yourface.online/",
    name: "AI Face Shape Detector for Men - Free Online Haircut and Beard Analyzer",
    description:
      "Upload your photo to instantly detect your face shape using AI and get more accurate style direction for men's haircuts, beards, and glasses based on your proportions.",
    url: "https://www.yourface.online/",
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
        name: "How accurate is an AI face shape detector for men's haircut decisions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It is most useful when the photo is clear, front-facing, and well lit. The better the input, the easier it is to separate lookalike shapes such as oval vs oblong before choosing a haircut or beard style.",
        },
      },
      {
        "@type": "Question",
        name: "What haircut suits an oval face male best?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Usually a textured crop, side part, Ivy League, or low quiff. Oval faces handle variety well, but very high top volume and super-tight sides can still push the face out of balance.",
        },
      },
      {
        "@type": "Question",
        name: "Does the tool store my uploaded photo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Your photos are not stored after analysis. The goal is fast face shape detection without turning your selfie into an unwanted museum exhibit.",
        },
      },
    ],
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <Hero />
        <HowToUse />
        <WhyChooseUs />
        <FaceShapesExplained />
        <section className="mx-auto max-w-6xl px-4">
          <FaceDetectorCTA
            title="Start with the male-first face shape path"
            description="If your goal is choosing better men's haircuts, beard styles, and glasses, go straight to the dedicated men's detector and styling hubs."
            ctaText="Open Face Shape Detector for Men"
            href="/face-shape-detector-for-men"
          />
        </section>
        <LearnMore />
        <StylingByUseCase />
        <FAQSection />
        <AppverseFooter />
      </main>

      <Script
        id="website-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />

      <Script
        id="webpage-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageStructuredData),
        }}
      />

      <Script
        id="app-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(appStructuredData),
        }}
      />

      <Script
        id="faq-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
    </>
  )
}
