"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How accurate is an AI face shape detector for men's haircut decisions?",
    answer:
      "It is most useful when the photo is clear, front-facing, and well lit. The better the input, the easier it is to separate lookalike shapes such as oval vs oblong before choosing a haircut or beard style.",
  },
  {
    question: "Can I detect my face shape from a selfie?",
    answer:
      "Yes. Use a straight-on selfie with your forehead, cheekbones, and jawline visible. That gives you a much better starting point for men's haircut, beard, and glasses choices.",
  },
  {
    question: "What haircut suits an oval face male best?",
    answer:
      "Usually a textured crop, side part, Ivy League, or low quiff. Oval faces handle variety well, but very high top volume and super-tight sides can still push the face out of balance.",
  },
  {
    question: "Does the tool store my uploaded photo?",
    answer:
      "No. Your photos are not stored after analysis. The goal is fast face shape detection without turning your selfie into an unwanted museum exhibit.",
  },
  {
    question: "Why does oval vs oblong matter so much for men?",
    answer:
      "Because haircut advice changes fast once the face gets longer. A cut that works for an oval face can easily over-elongate an oblong one, especially with high fades or too much height on top.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Frequently Asked Questions About Face Shape Detection
      </h2>

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="liquid-glass rounded-xl border border-white/20 px-6"
            >
              <AccordionTrigger className="text-left text-xl sm:text-2xl text-white hover:text-lime-300 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xl sm:text-2xl text-neutral-300">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
