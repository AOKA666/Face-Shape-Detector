"use client"

import Image from "next/image"
import Link from "next/link"
import { Scissors, User } from "lucide-react"

export function HairstylesByFaceShapeMen() {
  const categories = [
    {
      icon: <Scissors className="h-6 w-6 text-lime-300" />,
      title: "Haircuts by Face Shape",
      items: [
        "Oval face: controlled volume, textured crops, side parts, and low quiffs usually work best.",
        "Round face: choose cuts that add definition without widening the cheeks.",
        "Square face: keep structure sharp but avoid overly blocky styling.",
        "Oblong face: reduce extra height and keep more width through the sides.",
        "Heart and diamond face shapes: use texture to balance the forehead, cheekbones, and jaw.",
      ],
      href: "/mens-hairstyles-by-face-shape",
      cta: "Open the men's haircut hub",
    },
    {
      icon: <User className="h-6 w-6 text-lime-300" />,
      title: "Beard & Grooming by Face Shape",
      items: [
        "Beards change perceived jaw width, chin length, and lower-face balance.",
        "Round faces often benefit from more structure and length at the chin.",
        "Oblong faces usually need controlled beard length to avoid extra elongation.",
        "Oval faces can handle more beard styles, but proportion still matters.",
        "Use beard shape to support the haircut instead of fighting it.",
      ],
      href: "/beard-styles-by-face-shape",
      cta: "See beard style recommendations",
    },
  ]

  const illustrations = [
    {
      src: "buzz cut.png",
      alt: "Man with a textured buzz cut paired with clean skin",
      label: "Haircut fit depends on face shape",
    },
    {
      src: "beard.png",
      alt: "Bearded male profile showing how stubble reshapes the jawline",
      label: "Beards change facial balance too",
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-900">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Men&apos;s Haircuts and Beard Styles by Face Shape</h2>
          <p className="mt-4 text-lg text-white/60">
            Use your face shape as the baseline, then choose haircuts, beards, and glasses that keep your proportions balanced.
          </p>
        </div>
        <div className="grid gap-4 mb-10 md:grid-cols-2">
          {illustrations.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-neutral-900/50 p-4 backdrop-blur-sm">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white/5">
                <Image
                  src={`/images/for-man/${item.src}`}
                  alt={item.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p className="mt-3 text-center text-sm font-semibold text-white/80">{item.label}</p>
            </div>
          ))}
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
              <Link href={category.href} className="mt-6 inline-flex text-sm font-semibold text-lime-300 hover:text-lime-200">
                {category.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
