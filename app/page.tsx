import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { WhyChooseUs } from "@/components/why-choose-us"
import { HowToUse } from "@/components/how-to-use"
import { LearnMore } from "@/components/learn-more"
import { FaceShapesExplained } from "@/components/face-shapes-explained"
import { StylingByUseCase } from "@/components/styling-by-use-case"
import { FAQSection } from "@/components/faq-section"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"
import type { Metadata } from "next"

// Force static generation for low TTFB
export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Face Shape Detector | Free AI Face Shape Analysis Online",
  description:
    "Use a free AI face shape detector to identify oval, round, square, heart, diamond, or oblong face shape from a selfie. Get hairstyle and glasses guidance.",
  alternates: {
    canonical: "https://www.yourface.online/",
  },
  openGraph: {
    type: "website",
    url: "https://www.yourface.online/",
    title: "Face Shape Detector | Free AI Face Shape Analysis Online",
    description:
      "Use a free AI face shape detector to identify oval, round, square, heart, diamond, or oblong face shape from a selfie. Get hairstyle and glasses guidance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Face Shape Detector | Free AI Face Shape Analysis Online",
    description:
      "Use a free AI face shape detector to identify oval, round, square, heart, diamond, or oblong face shape from a selfie. Get hairstyle and glasses guidance.",
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
    name: "Face Shape Detector | Free AI Face Shape Analysis Online",
    description:
      "Use our free face shape detector online to detect face shape from photo with AI face shape analysis in seconds.",
    isPartOf: {
      "@id": "https://www.yourface.online/#website",
    },
  }

  const appStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.yourface.online/",
    name: "AI Face Shape Detector - Free Online Face Shape Analyzer from Photo",
    description:
      "Upload your photo to instantly detect your face shape using AI. Get personalized hairstyle, makeup, and styling recommendations based on your unique face shape.",
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
        <HowToUse />
        <WhyChooseUs />
        <FaceShapesExplained />
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
