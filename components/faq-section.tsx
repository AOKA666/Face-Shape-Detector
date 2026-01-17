"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How accurate is an AI face shape detector?",
    answer:
      "Our AI face shape detector uses advanced machine learning algorithms trained on thousands of facial images, achieving over 95% accuracy in identifying face shapes. The accuracy depends on photo quality and lighting conditions.",
  },
  {
    question: "Is this face shape analyzer free to use?",
    answer:
      "Yes, our face shape analyzer is completely free to use. There are no hidden fees, subscriptions, or premium features locked behind a paywall.",
  },
  {
    question: "Can I detect my face shape from a selfie?",
    answer:
      "Our AI works with selfies, portraits, and casual photos. For best results, use a well-lit photo where your face is clearly visible and facing the camera directly.",
  },
  {
    question: "Does the tool store my uploaded photo?",
    answer:
      "No, we never store your photos. All image processing happens locally in your browser, and your photos are immediately discarded after analysis. Your privacy is our priority.",
  },
  {
    question: "What is the most common face shape?",
    answer:
      "The oval face shape is often considered the most common, followed by round and square shapes. However, face shape distribution varies by ethnicity and genetics.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="container mx-auto px-4 py-16 sm:py-20">
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
              <AccordionTrigger className="text-left text-white hover:text-lime-300 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-300">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
