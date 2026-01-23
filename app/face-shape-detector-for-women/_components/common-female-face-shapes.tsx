"use client"

import { Circle, Heart } from "lucide-react"

// Custom oval icon
function OvalIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="12" cy="12" rx="9" ry="12" />
    </svg>
  )
}

export function CommonFemaleFaceShapes() {
  const shapes = [
    {
      icon: <OvalIcon className="h-6 w-6 text-lime-300" />,
      name: "Oval Face",
      description: "Balanced proportions with a gently rounded jaw. The most versatile face shape - almost any style looks great.",
      tips: ["Experiment freely with styles", "Most bangs work beautifully", "Versatile for accessories"],
    },
    {
      icon: <Heart className="h-6 w-6 text-lime-300" />,
      name: "Heart Face",
      description: "Wider forehead with a narrow, pointed chin. Heart-shaped faces look stunning with soft, sweeping styles.",
      tips: ["Side-swept bangs flatter", "Soft layers balance features", "Avoid heavy top volume"],
    },
    {
      icon: <Circle className="h-6 w-6 text-lime-300" />,
      name: "Round Face",
      description: "Soft curves with equal width and length. Round faces look best with styles that add angles and definition.",
      tips: ["Angled cuts add definition", "Side parts elongate face", "Long layers work wonderfully"],
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Common Female Face Shapes</h2>
          <p className="mt-4 text-lg text-white/60">
            Understanding your face shape is key to finding your perfect look
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {shapes.map((shape, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/20">
                {shape.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{shape.name}</h3>
              <p className="mb-4 text-white/60">{shape.description}</p>
              <div className="border-t border-white/10 pt-4 mt-4">
                <p className="text-sm font-semibold text-lime-300 mb-2">Style tips:</p>
                <ul className="space-y-1">
                  {shape.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-white/70">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
