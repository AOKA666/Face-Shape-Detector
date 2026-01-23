"use client"

import { Square, Circle } from "lucide-react"

// Custom rectangle icon since Rectangle doesn't exist in lucide-react
function RectangleIcon({ className }: { className?: string }) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  )
}

export function CommonMaleFaceShapes() {
  const shapes = [
    {
      icon: <Square className="h-6 w-6 text-lime-300" />,
      name: "Square Face",
      description: "Strong jawline with equal width and length. Works well with textured crops and side parts.",
      tips: ["Avoid boxy cuts", "Add texture and movement", "Side-swept styles work great"],
    },
    {
      icon: <Circle className="h-6 w-6 text-lime-300" />,
      name: "Oval Face",
      description: "Balanced proportions with slightly rounded jaw. The most versatile face shape for men.",
      tips: ["Almost any style works", "Pompadour is a great choice", "Classic side part looks sharp"],
    },
    {
      icon: <RectangleIcon className="h-6 w-6 text-lime-300" />,
      name: "Rectangle Face",
      description: "Longer than wide with a strong forehead and jaw. Can handle volume and length.",
      tips: ["Add width with side volume", "Avoid extra height on top", "Crew cuts work well"],
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Common Male Face Shapes</h2>
          <p className="mt-4 text-lg text-white/60">
            Understanding your face shape is key to finding perfect hairstyle
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
