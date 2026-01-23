"use client"

import { Scissors, Glasses } from "lucide-react"

export function WhyFaceShapeMattersMen() {
  const reasons = [
    {
      icon: <Scissors className="h-6 w-6 text-lime-300" />,
      title: "Haircuts",
      description: "The right haircut can balance your facial proportions, enhance your best features, and complement your style.",
      benefits: [
        "Creates visual balance",
        "Enhances facial structure",
        "Boosts confidence",
        "Professional appearance",
      ],
    },
    {
      icon: <Glasses className="h-6 w-6 text-lime-300" />,
      title: "Glasses",
      description: "Choosing frames that match your face shape ensures they complement rather than overpower your features.",
      benefits: [
        "Proportional frame selection",
        "Enhances natural features",
        "Comfortable fit",
        "Expresses personal style",
      ],
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Why Face Shape Matters for Men</h2>
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
