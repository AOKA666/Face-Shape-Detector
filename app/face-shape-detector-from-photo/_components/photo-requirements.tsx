"use client"

import { CheckCircle } from "lucide-react"

export function PhotoRequirements() {
  const requirements = [
    {
      title: "Clear Face",
      description: "Your face should be clearly visible without obstructions like hands, hair, or accessories covering key features.",
      tips: ["Remove glasses if possible", "Pull hair back from face", "No hands covering face"],
    },
    {
      title: "Front-Facing",
      description: "For the most accurate analysis, use a photo taken from the front with your head level and looking directly at the camera.",
      tips: ["Look straight at camera", "Keep head level", "Avoid extreme angles"],
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Photo Requirements</h2>
          <p className="mt-4 text-lg text-white/60">
            Follow these guidelines for the most accurate face shape analysis
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {requirements.map((req, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/20">
                  <CheckCircle className="h-6 w-6 text-lime-300" />
                </div>
                <h3 className="text-2xl font-bold text-white">{req.title}</h3>
              </div>
              <p className="mb-6 text-white/60">{req.description}</p>
              <div className="space-y-2">
                {req.tips.map((tip, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/80"
                  >
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-lime-400 flex-shrink-0" />
                    {tip}
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
