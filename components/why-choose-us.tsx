import { Zap, Shield, Camera, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Fast & Accurate Face Shape Detection Using AI",
    description: "Our advanced AI analyzes your facial features in seconds with high precision.",
  },
  {
    icon: Shield,
    title: "Privacy-First Face Shape Analysis (No Image Stored)",
    description: "Your photos are processed locally and never stored on our servers.",
  },
  {
    icon: Camera,
    title: "Works from Any Photo or Selfie",
    description: "Upload any clear photo of your face - selfies, portraits, or casual shots.",
  },
  {
    icon: Sparkles,
    title: "Personalized Hair, Makeup, and Style Recommendations",
    description: "Get tailored suggestions based on your unique face shape.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Why Choose Our AI Face Shape Detector
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card key={index} className="liquid-glass border border-white/20">
            <CardHeader>
              <feature.icon className="mb-2 h-8 w-8 text-lime-300" />
              <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-300">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
