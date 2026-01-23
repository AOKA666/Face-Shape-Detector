"use client"

import { Scissors, User } from "lucide-react"

export function HairstylesByFaceShapeMen() {
  const categories = [
    {
      icon: <Scissors className="h-6 w-6 text-lime-300" />,
      title: "Short Hair Styles",
      items: [
        "Buzz cut - Works great for oval and square faces",
        "Crew cut - Perfect for rectangle and oval faces",
        "Textured crop - Ideal for square and diamond faces",
        "Fade cut - Versatile for most face shapes",
        "Ivy league - Great for oval and round faces",
      ],
    },
    {
      icon: <User className="h-6 w-6 text-lime-300" />,
      title: "Beard Considerations",
      items: [
        "Beards can alter perceived face shape",
        "Full beard adds width to narrow faces",
        "Goatee can elongate round faces",
        "Stubble works well with most styles",
        "Consider beard with your hair length",
      ],
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Hairstyles by Face Shape (Men)</h2>
          <p className="mt-4 text-lg text-white/60">
            Discover the best hair and beard styles for your unique face shape
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
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
