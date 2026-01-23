import { SiteHeader } from "@/components/site-header"
import { HeroOnline } from "./_components/hero-online"
import { WhyOnlineMatters } from "./_components/why-online-matters"
import { ComparisonSection } from "./_components/comparison-section"
import { UseCases } from "./_components/use-cases"
import { InternalLinks } from "./_components/internal-links"
import { FAQOnline } from "./_components/faq-online"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

// Force static generation for low TTFB
export const dynamic = "force-static"

export default function OnlinePage() {
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://faceshapedetector.com/face-shape-detector-online",
    name: "Face Shape Detector Online - No App Required",
    description:
      "Use our free online face shape detector directly in your browser. No download needed, works on any device. Instant AI-powered face analysis.",
    url: "https://faceshapedetector.com/face-shape-detector-online",
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
        name: "Do I need to install anything?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, our online face shape detector works entirely in your web browser. There's no need to download or install any software - simply visit the page and start using it immediately.",
        },
      },
      {
        "@type": "Question",
        name: "Does it work on iPhone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our online detector works on iPhone, Android, tablets, and desktop computers. As long as you have a modern web browser and internet connection, you can use it on any device.",
        },
      },
      {
        "@type": "Question",
        name: "Is my photo stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, your photos are processed securely and are not stored on our servers. The analysis happens in real-time, and your images are discarded immediately after processing.",
        },
      },
    ],
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <HeroOnline />
        <WhyOnlineMatters />
        <ComparisonSection />
        <UseCases />
        <InternalLinks />
        <FAQOnline />
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
