"use client"

import Image from "next/image"
import { CheckCircle } from "lucide-react"

export function PhotoRequirements() {
  const requirements = [
    {
      title: "Clear Face",
      description: "Your face should be clearly visible without obstructions like hands, hair, or accessories covering key features.",
      tips: [
        { text: "Remove glasses if possible", image: { src: "remove-glasses.png", alt: "Removing glasses to keep face unobstructed" } },
        { text: "Pull hair back from face", image: { src: "pull-hair-back.png", alt: "Hair pulled back to reveal the full face" } },
        { text: "No hands covering face", image: { src: "no-hands-over.png", alt: "Hands kept away from the face for clarity" } },
      ],
    },
    {
      title: "Front-Facing",
      description: "For the most accurate analysis, use a photo taken from the front with your head level and looking directly at the camera.",
      tips: [
        { text: "Look straight at camera", image: { src: "look-straight.png", alt: "Looking straight at the camera for alignment" } },
        { text: "Keep head level", image: { src: "head-level.png", alt: "Keeping head level and centered" } },
        { text: "Avoid extreme angles", image: { src: "extreme-angles.png", alt: "Avoiding tilted or extreme photo angles" } },
      ],
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
                    className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/80"
                  >
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-white/10 flex-shrink-0">
                      <Image
                        src={`/images/from-photo/${tip.image.src}`}
                        alt={tip.image.alt}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-lime-400 flex-shrink-0" />
                      <span>{tip.text}</span>
                    </div>
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
