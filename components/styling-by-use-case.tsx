import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const useCases = [
  {
    title: "Face Shape Detector for Men",
    description: "Start with the male-first detector before choosing a haircut, beard shape, or glasses frame.",
    href: "/face-shape-detector-for-men",
  },
  {
    title: "Men's Haircuts by Face Shape",
    description: "Find haircut direction for oval, round, square, oblong, heart, and diamond faces.",
    href: "/mens-hairstyles-by-face-shape",
  },
  {
    title: "Beard Styles by Face Shape",
    description: "Use beard shape to add width, reduce length, and sharpen the jawline.",
    href: "/beard-styles-by-face-shape",
  },
  {
    title: "Male Face Shape Comparisons",
    description: "Compare oval vs oblong and other lookalike categories before copying the wrong style.",
    href: "/blog/oval-vs-oblong-face-male",
  },
  {
    title: "Male-first Blog Guides",
    description: "Browse haircut mistakes, beard ideas, and face-shape-driven grooming content for men.",
    href: "/blog#mens-style",
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
