import { SiteHeader } from "@/components/site-header"
import { HeroFromPhoto } from "./_components/hero-from-photo"
import { PhotoRequirements } from "./_components/photo-requirements"
import { PrivacySecurity } from "./_components/privacy-security"
import { SupportedPhotos } from "./_components/supported-photos"
import { InternalLinksFromPhoto } from "./_components/internal-links-from-photo"
import { FAQFromPhoto } from "./_components/faq-from-photo"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"
import type { Metadata } from "next"

// Force static generation for low TTFB
export const dynamic = "force-static"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.yourface.online/face-shape-detector-from-photo",
  },
}

export default function FromPhotoPage() {
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://faceshapedetector.com/face-shape-detector-from-photo",
    name: "Face Shape Detector from Photo - Instant Analysis",
    description:
      "Upload any photo to get instant face shape analysis. Discover your face shape with AI-powered technology. Free, secure, and no data storage.",
    url: "https://faceshapedetector.com/face-shape-detector-from-photo",
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
        name: "Are my photos saved?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, your photos are never saved or stored. They are processed temporarily for analysis and immediately deleted after results are generated. Your privacy is our top priority.",
        },
      },
      {
        "@type": "Question",
        name: "Can I upload group photos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our AI analyzes the most prominent face in the photo. For best results, upload a clear, front-facing photo of a single person. Group photos may not provide accurate face shape analysis.",
        },
      },
    ],
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <HeroFromPhoto />
        <PhotoRequirements />
        <PrivacySecurity />
        <SupportedPhotos />
        <InternalLinksFromPhoto />
        <FAQFromPhoto />
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
