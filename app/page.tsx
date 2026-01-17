import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { WhyChooseUs } from "@/components/why-choose-us"
import { WhatCanDetect } from "@/components/what-can-detect"
import { HowToUse } from "@/components/how-to-use"
import { FaceShapesExplained } from "@/components/face-shapes-explained"
import { HairstylesGuide } from "@/components/hairstyles-guide"
import { UserReviews } from "@/components/user-reviews"
import { FAQSection } from "@/components/faq-section"
import { LearnMore } from "@/components/learn-more"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

// Force static generation for low TTFB
export const dynamic = "force-static"

export default function Page() {
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://faceshapedetector.com/",
    name: "AI Face Shape Detector – Free Online Face Shape Analyzer from Photo",
    description:
      "Upload your photo to instantly detect your face shape using AI. Get personalized hairstyle, makeup, and styling recommendations based on your unique face shape.",
    url: "https://faceshapedetector.com/",
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
        name: "How accurate is an AI face shape detector?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our AI face shape detector uses advanced machine learning algorithms trained on thousands of facial images, achieving over 95% accuracy in identifying face shapes.",
        },
      },
      {
        "@type": "Question",
        name: "Is this face shape analyzer free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our face shape analyzer is completely free to use. There are no hidden fees, subscriptions, or premium features locked behind a paywall.",
        },
      },
      {
        "@type": "Question",
        name: "Does the tool store my uploaded photo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, we never store your photos. All image processing happens locally in your browser, and your photos are immediately discarded after analysis.",
        },
      },
    ],
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <Hero />
        <WhyChooseUs />
        <WhatCanDetect />
        <HowToUse />
        <FaceShapesExplained />
        <HairstylesGuide />
        <UserReviews />
        <FAQSection />
        <LearnMore />
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
