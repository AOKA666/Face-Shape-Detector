import { SiteHeader } from "@/components/site-header"
import { HeroMen } from "./_components/hero-men"
import { CommonMaleFaceShapes } from "./_components/common-male-face-shapes"
import { HairstylesByFaceShapeMen } from "./_components/hairstyles-by-face-shape-men"
import { WhyFaceShapeMattersMen } from "./_components/why-face-shape-matters-men"
import { InternalLinksMen } from "./_components/internal-links-men"
import { FAQMen } from "./_components/faq-men"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

// Force static generation for low TTFB
export const dynamic = "force-static"

export default function MenPage() {
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://faceshapedetector.com/face-shape-detector-for-men",
    name: "Face Shape Detector for Men - Find Your Best Hairstyle",
    description:
      "Discover your face shape and find the perfect hairstyle. AI-powered analysis for men with personalized hair and beard recommendations.",
    url: "https://faceshapedetector.com/face-shape-detector-for-men",
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
          text: "Yes, our AI can analyze your face shape even with facial hair. However, for the most accurate results, we recommend analyzing a photo with minimal facial hair first, then considering how your beard style can enhance or modify your overall appearance.",
        },
      },
      {
        "@type": "Question",
        name: "Does hair affect the result?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Long or voluminous hair can sometimes affect the analysis. For best results, use a photo with hair pulled back or styled naturally so your facial features are clearly visible. The AI focuses on bone structure and proportions rather than hair volume.",
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
