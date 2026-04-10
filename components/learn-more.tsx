import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, Scissors, Sparkles } from "lucide-react"

const articles = [
  {
    icon: Scissors,
    title: "Best Haircuts for Oval Face Male",
    description: "Controlled volume, texture, and balanced sides for one of the most versatile men's face shapes.",
    href: "/blog/best-haircuts-for-oval-face-male",
  },
  {
    icon: Scissors,
    title: "Worst Haircuts for Oval Faces Male",
    description: "Avoid the cuts that over-elongate an oval face or make it look too narrow.",
    href: "/blog/worst-haircuts-for-oval-faces-male",
  },
  {
    icon: Scissors,
    title: "Best Haircuts for Oblong Face Male",
    description: "Haircut direction that reduces extra length and keeps more width through the silhouette.",
    href: "/blog/best-haircuts-for-oblong-face-male",
  },
  {
    icon: Sparkles,
    title: "Best Beard Styles for Oval Face Male",
    description: "Beard shapes that support oval proportions instead of pulling the face downward.",
    href: "/blog/best-beard-styles-for-oval-face-male",
  },
  {
    icon: BookOpen,
    title: "Oval vs Oblong Face Male",
    description: "The difference that changes haircut and beard advice fast if your face already leans long.",
    href: "/blog/oval-vs-oblong-face-male",
  },
  {
    icon: Sparkles,
    title: "Best Beard Styles for Your Face Shape",
    description: "Use beard width, length, and outline to improve jawline balance and facial structure.",
    href: "/blog/best-beard-styles-for-your-face-shape",
  },
]

export function LearnMore() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Recommended Guides
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
