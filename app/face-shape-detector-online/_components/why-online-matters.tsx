"use client"

import { CheckCircle2, Smartphone, Monitor, Zap } from "lucide-react"

export function WhyOnlineMatters() {
  const features = [
    {
      icon: <CheckCircle2 className="h-6 w-6 text-lime-300" />,
      title: "No download required",
      description: "Access directly through your web browser without installing any software",
    },
    {
      icon: <Smartphone className="h-6 w-6 text-lime-300" />,
      title: "Works on mobile & desktop",
      description: "Seamlessly use on any device with an internet connection",
    },
    {
      icon: <Zap className="h-6 w-6 text-lime-300" />,
      title: "Instant results",
      description: "Get your face shape analysis in seconds with our AI-powered tool",
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Why Online Matters</h2>
          <p className="mt-4 text-lg text-white/60">
            Discover the advantages of using our online face shape detector
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/20">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
