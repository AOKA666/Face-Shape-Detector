import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const faceShapes = [
  {
    name: "Oval",
    slug: "oval-face-shape",
    description:
      "Balanced proportions with a slightly narrower forehead and jaw. Considered the most versatile face shape.",
  },
  {
    name: "Round",
    slug: "round-face-shape",
    description: "Equal width and length with soft angles. Cheekbones are the widest part of the face.",
  },
  {
    name: "Heart",
    slug: "heart-face-shape",
    description: "Wider forehead and cheekbones with a narrow, pointed chin.",
  },
  {
    name: "Diamond",
    slug: "diamond-face-shape",
    description: "Narrow forehead and jawline with wide, high cheekbones.",
  },
  {
    name: "Square",
    slug: "square-face-shape",
    description: "Equal width at forehead, cheekbones, and jaw with a strong, angular jawline.",
  },
  {
    name: "Oblong",
    slug: "oblong-face-shape",
    description: "Face length is greater than width with a long, straight cheek line.",
  },
]

export function FaceShapesExplained() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Common Face Shapes
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {faceShapes.map((shape, index) => (
          <Card key={index} className="liquid-glass border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-300 text-sm font-bold text-black">
                  {shape.name[0]}
                </span>
                {shape.name} Face Shape
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 overflow-hidden rounded-2xl bg-white/10">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={`/images/faces-shape/${shape.slug}.png`}
                      alt={`${shape.name} face shape illustration`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </div>
              </div>
              <p className="text-sm text-neutral-300">{shape.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
