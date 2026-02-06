import Image from "next/image"
import { Scan, Eye, CircleDot, Minus, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const detections = [
  {
    icon: Scan,
    title: "Face Shape Detection",
    description: "Oval, Round, Square, Heart, Diamond, Oblong and more.",
    image: { src: "faceshape.png", alt: "Illustration of different female face shapes labeled by type" },
  },
  {
    icon: Eye,
    title: "Eye Shape Analysis",
    description: "Identify your eye shape for better makeup and glasses recommendations.",
    image: { src: "eyes.png", alt: "Close-up showing various feminine eye shapes for analysis" },
  },
  {
    icon: CircleDot,
    title: "Nose Shape Analysis",
    description: "Understand your nose profile for contouring and styling tips.",
    image: { src: "nose.png", alt: "Profile view highlighting nose contours for shape detection" },
  },
  {
    icon: Minus,
    title: "Eyebrow Shape Recommendation",
    description: "Get the perfect eyebrow shape that complements your face.",
    image: { src: "eyebrows.png", alt: "Different eyebrow styles to match individual face shapes" },
  },
  {
    icon: Heart,
    title: "Lipstick & Makeup Suggestions",
    description: "Personalized makeup recommendations based on your face shape.",
    image: { src: "lipstick.png", alt: "Assortment of lipsticks and makeup products arranged neatly" },
  },
]

export function WhatCanDetect() {
  return (
    <section id="features" className="container mx-auto px-4 py-16 sm:py-20">
      <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        What Can Our Face Shape Analyzer Detect
      </h2>

      <div className="space-y-12">
        {detections.map((item, index) => {
          const reverse = index % 2 === 1 ? "md:flex-row-reverse" : ""
          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row md:items-stretch gap-6 ${reverse}`}
            >
              <div className="relative w-full md:w-1/2 h-[260px] md:h-[340px] overflow-hidden rounded-2xl bg-white/5">
                <Image
                  src={`/images/capabilities/${item.image.src}`}
                  alt={item.image.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  priority={index === 0}
                />
              </div>

              <Card className="w-full md:w-1/2 h-[260px] md:h-[340px] border border-white/20 bg-neutral-900/60 backdrop-blur-sm">
                <div className="flex h-full flex-col justify-center">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-300/10">
                      <item.icon className="h-6 w-6 text-lime-300" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-white whitespace-nowrap">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-base text-neutral-300 leading-relaxed">{item.description}</p>
                  </CardContent>
                </div>
              </Card>
            </div>
          )
        })}
      </div>
    </section>
  )
}
