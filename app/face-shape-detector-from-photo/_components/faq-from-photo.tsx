"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQFromPhoto() {
  const faqs = [
    {
      question: "Are my photos saved?",
      answer: "No, your photos are never saved or stored. They are processed temporarily for analysis and immediately deleted after results are generated. Your privacy is our top priority.",
    },
    {
      question: "Can I upload group photos?",
      answer: "Our AI analyzes the most prominent face in the photo. For best results, upload a clear, front-facing photo of a single person. Group photos may not provide accurate face shape analysis.",
    },
    {
      question: "What photo formats are supported?",
      answer: "We support common image formats including JPG, PNG, and WebP. Ensure your photo is clear and has good lighting for the best results.",
    },
    {
      question: "How large can the photo be?",
      answer: "Photos up to 10MB are supported. Larger photos will be automatically resized for optimal processing speed while maintaining quality.",
    },
    {
      question: "Is the analysis accurate?",
      answer: "Our AI-powered analysis is highly accurate when provided with clear, front-facing photos. Results are based on facial proportions and structural features recognized by advanced machine learning algorithms.",
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-white/60">
            Common questions about face shape detection from photos
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-white/10 rounded-2xl px-6 mb-4 bg-neutral-900/50"
              >
                <AccordionTrigger className="text-left text-white hover:text-lime-300 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 pt-4 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
