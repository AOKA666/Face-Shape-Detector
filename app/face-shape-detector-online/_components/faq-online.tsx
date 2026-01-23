"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQOnline() {
  const faqs = [
    {
      question: "Do I need to install anything?",
      answer: "No, our online face shape detector works entirely in your web browser. There's no need to download or install any software - simply visit the page and start using it immediately.",
    },
    {
      question: "Does it work on iPhone?",
      answer: "Yes, our online detector works on iPhone, Android, tablets, and desktop computers. As long as you have a modern web browser and internet connection, you can use it on any device.",
    },
    {
      question: "Is my photo stored?",
      answer: "No, your photos are processed securely and are not stored on our servers. The analysis happens in real-time, and your images are discarded immediately after processing.",
    },
    {
      question: "How accurate is the online detector?",
      answer: "Our AI-powered online detector uses advanced machine learning algorithms trained on thousands of facial images, achieving over 95% accuracy in identifying face shapes.",
    },
    {
      question: "Is it free to use?",
      answer: "Yes, our online face shape detector is completely free to use with no hidden fees, subscriptions, or premium features locked behind a paywall.",
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-white/60">
            Common questions about using our online face shape detector
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
