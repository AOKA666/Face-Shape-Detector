import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scissors } from "lucide-react"

const hairstyleGuide = [
  {
    shape: "Oval",
    styles: "Almost any hairstyle works! Try layers, bobs, or long waves.",
  },
  {
    shape: "Round",
    styles: "Add height with volume at the crown. Long layers and side-swept bangs work well.",
  },
  {
    shape: "Square",
    styles: "Soften angles with waves, layers, and side parts. Avoid blunt cuts.",
  },
  {
    shape: "Heart",
    styles: "Side-swept bangs and chin-length bobs balance a wider forehead.",
  },
  {
    shape: "Diamond",
    styles: "Add width at forehead and chin. Try side-swept bangs and textured layers.",
  },
  {
    shape: "Oblong",
    styles: "Add width with waves or curls. Avoid long, straight styles.",
  },
]

export function HairstylesGuide() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Best Hairstyles for Each Face Shape
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hairstyleGuide.map((item, index) => (
          <Card key={index} className="liquid-glass border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-white">
                <Scissors className="h-5 w-5 text-lime-300" />
                Hairstyles for {item.shape} Face
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-300">{item.styles}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
