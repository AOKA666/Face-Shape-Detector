"use client"

import { Scissors, Sparkles } from "lucide-react"

export function WhyFaceShapeMattersWomen() {
  const reasons = [
    {
      icon: <Scissors className="h-6 w-6 text-lime-300" />,
      title: "Hairstyles",
      description: "The right hairstyle can frame your face beautifully, enhance your best features, and express your personal style.",
      benefits: [
        "Creates visual harmony",
        "Enhances natural beauty",
        "Boosts confidence",
        "Complements your lifestyle",
      ],
    },
    {
      icon: <Sparkles className="h-6 w-6 text-lime-300" />,
      title: "Makeup & Accessories",
      description: "Knowing your face shape helps you choose makeup techniques and accessories that highlight your unique features.",
      benefits: [
        "Flattering makeup looks",
        "Perfect accessory choices",
        "Balanced facial proportions",
        "Effortless elegance",
      ],
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Why Face Shape Matters for Women</h2>
          <p className="mt-4 text-lg text-white/60">
            Your face shape influences every styling decision - from haircuts to accessories
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/20">
                  {reason.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{reason.title}</h3>
              </div>
              <p className="mb-6 text-white/60">{reason.description}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {reason.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/80"
                  >
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
