"use client"

import { Camera, User } from "lucide-react"

export function SupportedPhotos() {
  const types = [
    {
      icon: <Camera className="h-6 w-6 text-lime-300" />,
      title: "Selfies",
      description: "Selfies work perfectly for face shape analysis. Just ensure good lighting and your face is clearly visible in the frame.",
      features: ["Quick and convenient", "Works with front camera", "Natural expression"],
    },
    {
      icon: <User className="h-6 w-6 text-lime-300" />,
      title: "Portraits",
      description: "Professional or casual portraits provide excellent results. Clear, high-quality images give the most accurate analysis.",
      features: ["High-quality results", "Professional lighting", "Detailed analysis"],
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Supported Photos</h2>
          <p className="mt-4 text-lg text-white/60">
            Various photo types work well for face shape analysis
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {types.map((type, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/20">
                  {type.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{type.title}</h3>
              </div>
              <p className="mb-6 text-white/60">{type.description}</p>
              <div className="space-y-2">
                {type.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/80"
                  >
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-lime-400 flex-shrink-0" />
                    {feature}
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
