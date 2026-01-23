"use client"

import { AlertTriangle, RotateCw } from "lucide-react"

export function CommonMistakes() {
  const mistakes = [
    {
      icon: <AlertTriangle className="h-6 w-6 text-lime-300" />,
      title: "Hair Covering Face",
      description: "When hair covers your forehead, cheeks, or jawline, it becomes difficult to see your actual face shape. Always pull hair back or tie it away from your face before analysis.",
      consequences: [
        "Hides forehead width",
        "Obscures jawline",
        "Distorts face proportions",
        "Leads to inaccurate results",
      ],
    },
    {
      icon: <RotateCw className="h-6 w-6 text-lime-300" />,
      title: "Wrong Angles",
      description: "Extreme angles can dramatically alter how your face appears. Tiling your head up or down changes the perceived proportions of your features, making accurate shape identification nearly impossible.",
      consequences: [
        "Distorts facial proportions",
        "Changes perceived jawline",
        "Alters forehead appearance",
        "Creates false impressions",
      ],
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Common Mistakes</h2>
          <p className="mt-4 text-lg text-white/60">
            Avoid these common errors when determining your face shape
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {mistakes.map((mistake, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/20">
                  {mistake.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{mistake.title}</h3>
              </div>
              <p className="mb-6 text-white/60">{mistake.description}</p>
              <div className="space-y-2">
                {mistake.consequences.map((consequence, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/80"
                  >
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-lime-400 flex-shrink-0" />
                    {consequence}
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
