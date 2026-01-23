"use client"

import { Shield, Lock } from "lucide-react"

export function PrivacySecurity() {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-lime-300" />,
      title: "Photos Not Stored",
      description: "Your uploaded photos are processed temporarily and immediately deleted after analysis. We never save, share, or sell your images.",
      benefits: [
        "Instant deletion after processing",
        "No database storage",
        "Complete privacy protection",
      ],
    },
    {
      icon: <Lock className="h-6 w-6 text-lime-300" />,
      title: "Secure Processing",
      description: "Your photos are processed using enterprise-grade encryption and security protocols to ensure your data remains private.",
      benefits: [
        "End-to-end encryption",
        "Secure data transmission",
        "Enterprise security standards",
      ],
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Privacy & Security</h2>
          <p className="mt-4 text-lg text-white/60">
            Your privacy is our top priority - your photos are never stored
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/20">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
              </div>
              <p className="mb-6 text-white/60">{feature.description}</p>
              <div className="space-y-2">
                {feature.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/80"
                  >
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-lime-400 flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
