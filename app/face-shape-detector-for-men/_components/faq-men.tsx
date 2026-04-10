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
      answer: "Yes. Facial hair can change the visual outline of your jaw, but our tool can still help you identify the underlying face shape. For the cleanest read, upload a photo with lighter beard growth first, then use beard style guides as a second step.",
    },
    {
      question: "What haircut suits an oval face male best?",
      answer: "Oval faces usually do best with controlled volume, natural texture, and balanced sides. Textured crops, side parts, Ivy League cuts, and low quiffs are usually safer than extra-tall pompadours or ultra-tight fades.",
    },
    {
      question: "Does a beard make your face look longer?",
      answer: "It can. Pointed or chin-heavy beard shapes usually add vertical length, while wider and more controlled beard shapes can add balance. That matters a lot for oblong, round, and oval faces.",
    },
    {
      question: "Does hair affect the result?",
      answer: "Yes. Long fringes, big curls, or heavy volume can make face shape harder to read. Use a clear front-facing photo with your forehead, cheekbones, and jawline visible.",
    },
    {
      question: "How do I choose glasses for my face shape?",
      answer: "Start with proportion. Square faces often suit rounder frames, round faces usually need more structure, and oval faces can handle most frame shapes. Use face shape first, then refine by style preference.",
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="mx-auto max-w-4xl px-4">
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
                <AccordionTrigger className="text-left text-xl sm:text-2xl text-white hover:text-lime-300 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xl sm:text-2xl text-neutral-300 pt-4 pb-6">
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
