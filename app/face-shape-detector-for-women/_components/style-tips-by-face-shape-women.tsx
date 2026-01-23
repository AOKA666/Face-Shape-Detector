"use client"

import { Scissors, Sparkles } from "lucide-react"

export function StyleTipsByFaceShapeWomen() {
  const categories = [
    {
      icon: <Scissors className="h-6 w-6 text-lime-300" />,
      title: "Hairstyles",
      items: [
        "Long waves - Perfect for oval and heart faces",
        "Pixie cut - Great for oval and heart shapes",
        "Bob with layers - Ideal for round faces",
        "Side-swept bangs - Flatters most face shapes",
        "Messy updo - Works beautifully for oval faces",
      ],
    },
    {
      icon: <Sparkles className="h-6 w-6 text-lime-300" />,
      title: "Bangs & Layers",
      items: [
        "Curtain bangs - Soften heart face foreheads",
        "Wispy bangs - Complement round face shapes",
        "Side bangs - Create asymmetry for oval faces",
        "Long layers - Add movement to any style",
        "Face-framing layers - Highlight best features",
      ],
    },
    {
      icon: <Sparkles className="h-6 w-6 text-lime-300" />,
      title: "Accessories",
      items: [
        "Statement earrings - Draw attention up for heart faces",
        "Delicate necklaces - Elongate round face shapes",
        "Bold headbands - Add height for oval faces",
        "Hair clips - Add visual interest and dimension",
        "Scarves - Create soft, romantic looks",
      ],
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Style Tips by Face Shape</h2>
          <p className="mt-4 text-lg text-white/60">
            Discover the best hairstyles, bangs, and accessories for your unique face shape
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/20">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>
              <ul className="space-y-3">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-lime-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
