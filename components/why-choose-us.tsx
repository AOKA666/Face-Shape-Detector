import { Zap, Shield, Camera, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Faster, More Accurate Face Shape Analysis",
    description: "Built to give cleaner face shape reads from clear front-facing photos, so your haircut and beard decisions start from a stronger baseline.",
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
    title: "Men's Haircut, Beard, and Glasses Direction",
    description: "Use your face shape result to make sharper grooming and style decisions instead of copying random trends.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Why Use This Face Shape Detector
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
