"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQWomen() {
  const faqs = [
    {
      question: "Can I use selfies?",
      answer: "Yes, selfies work great! Just ensure good lighting and your face is clearly visible. Front-facing photos provide the most accurate results for face shape analysis.",
    },
    {
      question: "Does makeup affect accuracy?",
      answer: "Light to moderate makeup won't affect accuracy significantly. However, heavy contouring or dramatic makeup may alter how your facial structure appears. For the most natural analysis, use photos with minimal makeup.",
    },
    {
      question: "What's the best hairstyle for my face shape?",
      answer: "Each face shape has complementary styles. Oval faces can pull off almost any look, heart faces look stunning with side-swept styles, and round faces benefit from angled cuts that add definition. Our analysis provides personalized recommendations.",
    },
    {
      question: "How do I choose the right bangs?",
      answer: "For heart faces, curtain bangs soften the forehead. Round faces look great with wispy, side-swept bangs that create asymmetry. Oval faces can experiment with various bang styles. Our tool includes specific bang recommendations.",
    },
    {
      question: "Can face shape change over time?",
      answer: "Your basic bone structure remains the same, but factors like aging, weight changes, and styling can alter how your face shape appears. Regular check-ins can help adjust your style as your look evolves.",
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-white/60">
            Common questions about face shape analysis for women
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
