"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQMen() {
  const faqs = [
    {
      question: "Is this accurate for men with beards?",
      answer: "Yes, our AI can analyze your face shape even with facial hair. However, for the most accurate results, we recommend analyzing a photo with minimal facial hair first, then considering how your beard style can enhance or modify your overall appearance.",
    },
    {
      question: "Does hair affect the result?",
      answer: "Long or voluminous hair can sometimes affect the analysis. For best results, use a photo with hair pulled back or styled naturally so your facial features are clearly visible. The AI focuses on bone structure and proportions rather than hair volume.",
    },
    {
      question: "What's the best hairstyle for my face shape?",
      answer: "Each face shape has complementary styles. Square faces benefit from textured styles that soften edges, oval faces can pull off almost any look, and rectangular faces need styles that add width. Our analysis provides personalized recommendations.",
    },
    {
      question: "Can face shape change over time?",
      answer: "Your basic bone structure remains the same, but factors like aging, weight changes, and facial hair can alter how your face shape appears. Regular check-ins can help adjust your style as your look evolves.",
    },
    {
      question: "How do I choose the right glasses?",
      answer: "For square faces, look for round or oval frames to soften angles. Oval faces can handle most frame shapes. Rectangle faces benefit from wider frames with decorative temples. Our analysis includes glasses recommendations.",
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-white/60">
            Common questions about face shape analysis for men
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
