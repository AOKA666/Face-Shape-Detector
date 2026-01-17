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
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        What Can Our Face Shape Analyzer Detect
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {detections.map((item, index) => (
          <Card key={index} className="liquid-glass border border-white/20">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-300/10">
                <item.icon className="h-6 w-6 text-lime-300" />
              </div>
              <CardTitle className="text-lg text-white">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-300">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
