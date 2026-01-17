import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    review: "Finally found out I have a heart-shaped face! The hairstyle recommendations were spot on.",
  },
  {
    name: "James L.",
    rating: 5,
    review: "Quick and accurate. Helped me choose the right glasses frames for my face shape.",
  },
  {
    name: "Emily R.",
    rating: 5,
    review: "Love that it's free and doesn't store my photos. Very privacy-conscious!",
  },
  {
    name: "Michael T.",
    rating: 4,
    review: "Great tool for understanding facial proportions. Very helpful for styling.",
  },
]

export function UserReviews() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Real User Reviews of Our Face Shape Detector
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((review, index) => (
          <Card key={index} className="liquid-glass border border-white/20">
            <CardContent className="pt-6">
              <div className="mb-3 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-lime-300 text-lime-300" : "text-neutral-600"}`}
                  />
                ))}
              </div>
              <p className="mb-4 text-sm text-neutral-300">&ldquo;{review.review}&rdquo;</p>
              <p className="text-sm font-semibold text-white">{review.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
