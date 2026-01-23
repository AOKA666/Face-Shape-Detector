import { SiteHeader } from "@/components/site-header"
import { HeroWomen } from "./_components/hero-women"
import { CommonFemaleFaceShapes } from "./_components/common-female-face-shapes"
import { StyleTipsByFaceShapeWomen } from "./_components/style-tips-by-face-shape-women"
import { WhyFaceShapeMattersWomen } from "./_components/why-face-shape-matters-women"
import { InternalLinksWomen } from "./_components/internal-links-women"
import { FAQWomen } from "./_components/faq-women"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

// Force static generation for low TTFB
export const dynamic = "force-static"

export default function WomenPage() {
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://faceshapedetector.com/face-shape-detector-for-women",
    name: "Face Shape Detector for Women - Discover Your Best Look",
    description:
      "Discover your face shape and find the perfect makeup, hairstyles, and accessories. AI-powered analysis for women with personalized beauty recommendations.",
    url: "https://faceshapedetector.com/face-shape-detector-for-women",
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
        name: "Can I use selfies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, selfies work great! Just ensure good lighting and your face is clearly visible. Front-facing photos provide the most accurate results for face shape analysis.",
        },
      },
      {
        "@type": "Question",
        name: "Does makeup affect accuracy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Light to moderate makeup won't affect accuracy significantly. However, heavy contouring or dramatic makeup may alter how your facial structure appears. For the most natural analysis, use photos with minimal makeup.",
        },
      },
    ],
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <HeroWomen />
        <CommonFemaleFaceShapes />
        <StyleTipsByFaceShapeWomen />
        <WhyFaceShapeMattersWomen />
        <InternalLinksWomen />
        <FAQWomen />
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
