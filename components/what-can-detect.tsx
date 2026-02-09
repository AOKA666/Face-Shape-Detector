import { Scan, Eye, CircleDot, Minus, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const detections = [
  {
    icon: Scan,
    title: "Face Shape Detection",
    description: "Oval, Round, Square, Heart, Diamond, Oblong and more.",
  },
  {
    icon: Eye,
    title: "Eye Shape Analysis",
    description: "Identify your eye shape for better makeup and glasses recommendations.",
  },
  {
    icon: CircleDot,
    title: "Nose Shape Analysis",
    description: "Understand your nose profile for contouring and styling tips.",
  },
  {
    icon: Minus,
    title: "Eyebrow Shape Recommendation",
    description: "Get the perfect eyebrow shape that complements your face.",
  },
  {
    icon: Heart,
    title: "Lipstick & Makeup Suggestions",
    description: "Personalized makeup recommendations based on your face shape.",
  },
]

export function WhatCanDetect() {
  return (
    <section id="features" className="container mx-auto px-4 py-16 sm:py-20">
      <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        What Can Our Face Shape Analyzer Detect
      </h2>

      <div className="space-y-8">
        {detections.map((item, index) => (
          <div key={index} className="w-full max-w-2xl mx-auto">
            <Card className="border border-white/20 bg-neutral-900/60 backdrop-blur-sm">
              <div className="flex h-full flex-col justify-center items-center text-center p-8">
                <CardHeader className="flex flex-col items-center gap-4">
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
        ))}
      </div>
    </section>
  )
}
