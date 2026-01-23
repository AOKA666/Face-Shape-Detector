"use client"

import { Circle, Heart, Square } from "lucide-react"

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

export function FaceShapeTypesExplained() {
  const shapes = [
    {
      icon: <OvalIcon className="h-6 w-6 text-lime-300" />,
      name: "Oval Face",
      description: "Balanced proportions with a gently rounded jaw. The forehead is slightly wider than the chin, and the length is slightly greater than the width. This is considered the most versatile face shape.",
      characteristics: ["Balanced proportions", "Gently rounded jaw", "Versatile styling options"],
    },
    {
      icon: <Circle className="h-6 w-6 text-lime-300" />,
      name: "Round Face",
      description: "Soft curves with equal width and length. The face is widest at the cheeks with a curved chin. Round faces often appear more youthful and friendly.",
      characteristics: ["Soft, curved features", "Widest at cheeks", "Rounded chin line"],
    },
    {
      icon: <Square className="h-6 w-6 text-lime-300" />,
      name: "Square Face",
      description: "Strong, angular features with equal width and length. The jawline is typically as wide as the forehead, creating a square appearance with a sharp, defined chin.",
      characteristics: ["Strong jawline", "Angular features", "Equal forehead and jaw width"],
    },
    {
      icon: <Heart className="h-6 w-6 text-lime-300" />,
      name: "Heart Face",
      description: "Wider forehead that narrows down to a pointed chin. The face resembles a heart shape, often with high cheekbones and a delicate jawline.",
      characteristics: ["Wider forehead", "Pointed chin", "High cheekbones"],
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Face Shape Types Explained</h2>
          <p className="mt-4 text-lg text-white/60">
            Learn about the most common face shapes and their unique characteristics
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {shapes.map((shape, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/20">
                {shape.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{shape.name}</h3>
              <p className="mb-6 text-white/60">{shape.description}</p>
              <div className="border-t border-white/10 pt-4 mt-4">
                <p className="text-sm font-semibold text-lime-300 mb-2">Key characteristics:</p>
                <ul className="space-y-1">
                  {shape.characteristics.map((char, i) => (
                    <li key={i} className="text-sm text-white/70">
                      • {char}
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
