"use client"

import { Ruler, Zap } from "lucide-react"

export function HowToFindFaceShape() {
  const methods = [
    {
      icon: <Ruler className="h-6 w-6 text-lime-300" />,
      title: "Manual Method",
      description: "You can determine your face shape by taking measurements and analyzing proportions. Start by pulling hair back and looking straight into a mirror. Measure your forehead width, cheekbone width, jawline width, and face length to compare ratios.",
      steps: [
        "Pull hair back to see hairline clearly",
        "Measure forehead at widest point",
        "Measure cheekbones at widest point",
        "Measure jawline below ears",
        "Compare width and length ratios",
      ],
    },
    {
      icon: <Zap className="h-6 w-6 text-lime-300" />,
      title: "Using AI Tools",
      description: "Modern AI-powered face shape detectors can instantly analyze your face shape from a photo. Simply upload a clear, front-facing photo and get accurate results based on facial landmarks and proportions. This is the fastest and most convenient method.",
      benefits: [
        "Instant results",
        "Highly accurate analysis",
        "No measurements needed",
        "Works with any clear photo",
      ],
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">How to Find Your Face Shape</h2>
          <p className="mt-4 text-lg text-white/60">
            Two main methods to discover your face shape
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {methods.map((method, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/20">
                  {method.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{method.title}</h3>
              </div>
              <p className="mb-6 text-white/60">{method.description}</p>
              <div className="space-y-2">
                {(method.steps || method.benefits)?.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/80"
                  >
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-lime-400 flex-shrink-0" />
                    {item}
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
