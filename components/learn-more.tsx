import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Scissors, Users } from "lucide-react"

const articles = [
  {
    icon: BookOpen,
    title: "How to Know Your Face Shape Without Measuring",
    description: "Learn simple visual techniques to identify your face shape at home.",
  },
  {
    icon: Scissors,
    title: "Best Haircuts Based on Face Shape",
    description: "Comprehensive guide to finding the perfect haircut for your face shape.",
  },
  {
    icon: Users,
    title: "Face Shape Guide for Men and Women",
    description: "Tailored advice and styling tips for all genders and face types.",
  },
]

export function LearnMore() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Learn More About Face Shapes & Styling
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article, index) => (
          <Card
            key={index}
            className="liquid-glass cursor-pointer border border-white/20 transition-all duration-300 hover:border-lime-300/50 hover:shadow-[0_0_20px_rgba(163,230,53,0.1)]"
          >
            <CardHeader>
              <article.icon className="mb-2 h-8 w-8 text-lime-300" />
              <CardTitle className="text-lg text-white">{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-300">{article.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
