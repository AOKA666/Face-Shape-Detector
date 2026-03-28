import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const useCases = [
  {
    title: "Face Shape Basics",
    description: "Start with identification frameworks and common mistakes.",
    href: "/blog#basics",
  },
  {
    title: "Hairstyles by Face Shape",
    description: "Find haircuts that add balance based on your face proportions.",
    href: "/blog#hairstyles",
  },
  {
    title: "Glasses & Accessories",
    description: "Choose frames and accessory lines that complement your structure.",
    href: "/blog#glasses",
  },
  {
    title: "Beard & Grooming",
    description: "Shape facial hair to improve jawline and face-width balance.",
    href: "/blog#beard",
  },
  {
    title: "AI & Analysis",
    description: "Understand how detector quality changes with input conditions.",
    href: "/blog#ai-analysis",
  },
]

export function StylingByUseCase() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Styling by Use Case
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((item) => (
          <Link key={item.href} href={item.href} className="block">
            <Card className="h-full border border-white/20 bg-neutral-900/60 transition hover:border-lime-300/50 hover:bg-neutral-900/80">
              <CardHeader>
                <CardTitle className="text-lg text-white">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-300">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
