"use client"

import { Info } from "lucide-react"

export function Intro() {
  const points = [
    {
      title: "What's Face Shape?",
      description: "Face shape refers to the overall outline and proportions of your face. It's determined by your bone structure, including your jawline, forehead, cheekbones, and chin. Understanding your face shape helps you choose hairstyles, makeup, and accessories that flatter your features.",
    },
    {
      title: "Why Many People Don't Know",
      description: "Most people struggle to identify their face shape because it requires looking at the face objectively, which can be challenging. Hair styling, makeup techniques, and even head tilting in mirrors can distort perception. Many people are unsure what they're looking for or how to measure facial proportions accurately.",
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">What Face Shape Do I Have?</h1>
          <p className="mt-4 text-lg text-white/60">
            Understanding your face shape is the first step to enhancing your natural beauty
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {points.map((point, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/20">
                  <Info className="h-6 w-6 text-lime-300" />
                </div>
                <h3 className="text-2xl font-bold text-white">{point.title}</h3>
              </div>
              <p className="text-white/60">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
