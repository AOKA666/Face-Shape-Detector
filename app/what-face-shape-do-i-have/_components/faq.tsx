"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "Can face shape change?",
      answer: "Your basic bone structure remains the same throughout life. However, factors like aging, weight changes, and facial hair can alter how your face shape appears. You may notice subtle changes over time, but your fundamental face shape type stays consistent.",
    },
    {
      question: "Is face shape genetic?",
      answer: "Yes, face shape is largely determined by genetics. Your bone structure, jawline, and facial proportions are inherited from your parents. While lifestyle factors can affect appearance, your basic face shape is primarily genetic.",
    },
    {
      question: "How accurate is face shape analysis?",
      answer: "AI-powered face shape analysis is highly accurate when provided with clear, front-facing photos. The technology analyzes multiple facial landmarks and proportions to determine your face shape with precision comparable to professional stylists.",
    },
    {
      question: "Can I have mixed face shape features?",
      answer: "Yes, many people have characteristics of multiple face shapes. It's common to have a primary face shape with secondary traits from another type. Our analysis identifies your dominant face shape while noting other characteristic features.",
    },
    {
      question: "At what age is face shape determined?",
      answer: "Your basic face shape is genetically determined and becomes more defined as you grow. By late childhood and early teens, your facial bone structure is mostly set. However, subtle changes can continue into early adulthood.",
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-white/60">
            Common questions about face shapes and analysis
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
