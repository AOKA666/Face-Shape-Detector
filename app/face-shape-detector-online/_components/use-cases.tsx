"use client"

import { Clock, Briefcase, GraduationCap } from "lucide-react"

export function UseCases() {
  const useCases = [
    {
      icon: <Clock className="h-6 w-6 text-lime-300" />,
      title: "Quick checks",
      description: "Get instant face shape analysis whenever you need it, without waiting for downloads or installations",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-lime-300" />,
      title: "Office / school computers",
      description: "Use on any computer without admin privileges or installing software - perfect for shared devices",
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-lime-300" />,
      title: "Learning & education",
      description: "Great for students and educators to understand face shapes without technical barriers",
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
        <div className="grid gap-8 md:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                {useCase.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{useCase.title}</h3>
              <p className="text-white/60">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
