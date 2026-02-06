"use client"

import Image from "next/image"
import { Clock, Briefcase, GraduationCap } from "lucide-react"

export function UseCases() {
  const useCases = [
    {
      icon: <Clock className="h-6 w-6 text-lime-300" />,
      title: "Quick checks",
      description: "Get instant face shape analysis whenever you need it, without waiting for downloads or installations",
      image: { src: "quick-checks.png", alt: "Quick online face shape check on a laptop" },
    },
    {
      icon: <Briefcase className="h-6 w-6 text-lime-300" />,
      title: "Office / school computers",
      description: "Use on any computer without admin privileges or installing software - perfect for shared devices",
      image: { src: "office-school computers.png", alt: "Using the detector on a shared office computer" },
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-lime-300" />,
      title: "Learning & education",
      description: "Great for students and educators to understand face shapes without technical barriers",
      image: { src: "learning-education.png", alt: "Students learning face shapes online" },
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Use Cases</h2>
          <p className="mt-4 text-lg text-white/60">
            Perfect for various scenarios where convenience matters most
          </p>
        </div>
        <div className="space-y-10">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row md:items-stretch gap-6 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="relative w-full md:w-1/2 h-[260px] md:h-[340px] overflow-hidden rounded-2xl bg-white/5">
                <Image
                  src={`/images/online/${useCase.image.src}`}
                  alt={useCase.image.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  priority={index === 0}
                />
              </div>
              <div className="w-full md:w-1/2 h-[260px] md:h-[340px] rounded-2xl border border-white/15 bg-neutral-900/60 p-8 flex flex-col justify-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  {useCase.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white whitespace-nowrap">{useCase.title}</h3>
                <p className="text-white/70 text-base leading-relaxed">{useCase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
