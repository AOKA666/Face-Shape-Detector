import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, Scissors, Sparkles } from "lucide-react"

const articles = [
  {
    icon: BookOpen,
    title: "What Face Shape Do I Have? A Simple Step-by-Step Guide",
    description: "Follow a practical method to identify your face shape from forehead, cheekbones, jawline, and length.",
    href: "/blog/what-face-shape-do-i-have-a-simple-step-by-step-guide",
  },
  {
    icon: Scissors,
    title: "How to Tell Your Face Shape From a Selfie",
    description: "Learn how to detect face shape from photo with simple checks and better selfie setup.",
    href: "/blog/how-to-tell-your-face-shape-from-a-selfie",
  },
  {
    icon: Sparkles,
    title: "Best Glasses for Your Face Shape",
    description: "Find frame styles that balance round, square, oval, heart, diamond, and oblong face shapes.",
    href: "/blog/best-glasses-for-your-face-shape",
  },
  {
    icon: Scissors,
    title: "Best Hairstyles for Round Face Shape",
    description: "Hairstyles that add structure and visual length for round face proportions.",
    href: "/blog/best-hairstyles-for-round-face-shape",
  },
  {
    icon: Scissors,
    title: "Best Hairstyles for Square Face Shape",
    description: "Cuts that soften strong angles while keeping a sharp, intentional style.",
    href: "/blog/best-hairstyles-for-square-face-shape",
  },
  {
    icon: BookOpen,
    title: "Best Beard Styles for Your Face Shape",
    description: "Use beard shape and length to add balance for each face type.",
    href: "/blog/best-beard-styles-for-your-face-shape",
  },
]

export function LearnMore() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Learn More About Face Shapes & Styling
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <Link key={index} href={article.href} className="block">
            <Card className="liquid-glass h-full cursor-pointer border border-white/20 transition-all duration-300 hover:border-lime-300/50 hover:shadow-[0_0_20px_rgba(163,230,53,0.1)]">
              <CardHeader>
                <article.icon className="mb-2 h-8 w-8 text-lime-300" />
                <CardTitle className="text-lg text-white">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-300">{article.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
