import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const detections = [
  {
    image: "eyes.webp",
    title: "Detect Your Eye Shape",
    description: "Struggling to choose right eye makeup? Our smart tool works alongside the face shape analysis feature to detect face shape and your eye shape, size, and spacing. It even identifies under-eye areas to recommend makeup styles that truly suit your natural features",
  },
  {
    image: "lips.webp",
    title: "Choose the Right Lipstick Shade for Your Shape",
    description: "Not sure which lipstick shade is right for you? Our face shape checker analyzes your unique facial features to recommend colors that naturally flatter your look, making it easier to choose shades that truly suit you.",
  },
  {
    image: "eyebrows.webp",
    title: "Find the Best Eyebrow Shape for Your Face",
    description: "Using insights from online face shape detector, this tool reviews your facial structure and eyebrow details to recommend brow shapes that truly suit you. Get tailored suggestions that highlight your features and complement your natural look.",
  },
  {
    image: "nose.webp",
    title: "Nose Shape Analysis",
    description: "Understand your nose profile for contouring and styling tips.",
  },
]

export function WhatCanDetect() {
  return (
    <section id="features" className="mx-auto max-w-4xl px-4 py-12 sm:py-20">
      <h2 className="mb-10 text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        What Can Our Face Shape Analyzer Detect
      </h2>

      <div className="grid gap-8 sm:gap-12 lg:gap-16 max-w-4xl mx-auto">
        {detections.map((item, index) => (
          <Card
            key={index}
            className="border border-white/20 bg-neutral-900/60 backdrop-blur-sm overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-4 sm:p-6">
              <div className="relative w-full sm:w-1/3 h-48 sm:h-64 flex-shrink-0 rounded-xl overflow-hidden bg-white/5">
                <Image
                  src={`/images/capabilities/${item.image}`}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 300px"
                />
              </div>

              <CardContent className="flex-1 pt-0 sm:pt-0">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
