import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const faceShapes = [
  {
    name: "Oval",
    description:
      "Balanced proportions with a slightly narrower forehead and jaw. Considered the most versatile face shape.",
  },
  {
    name: "Round",
    description: "Equal width and length with soft angles. Cheekbones are the widest part of the face.",
  },
  {
    name: "Heart",
    description: "Wider forehead and cheekbones with a narrow, pointed chin.",
  },
  {
    name: "Diamond",
    description: "Narrow forehead and jawline with wide, high cheekbones.",
  },
  {
    name: "Square",
    description: "Equal width at forehead, cheekbones, and jaw with a strong, angular jawline.",
  },
  {
    name: "Oblong",
    description: "Face length is greater than width with a long, straight cheek line.",
  },
]

export function FaceShapesExplained() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Different Types of Face Shapes Explained
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
              <p className="text-sm text-neutral-300">{shape.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
