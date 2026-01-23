"use client"

import { Download, Globe, Smartphone as PhoneIcon } from "lucide-react"

export function ComparisonSection() {
  const onlineFeatures = [
    "No installation needed",
    "Works on any device",
    "Instant access",
    "No storage required",
    "Always up to date",
    "Free to use",
  ]

  const appFeatures = [
    "Requires download & install",
    "Platform-specific",
    "Setup time needed",
    "Uses device storage",
    "Manual updates",
    "Often paid",
  ]

  const CheckCircle = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )

  const X = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Online vs App Face Shape Detectors</h2>
          <p className="mt-4 text-lg text-white/60">
            Compare and see why our online solution is the smarter choice
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Online Column */}
          <div className="rounded-2xl border-2 border-lime-400/30 bg-gradient-to-br from-lime-400/5 to-neutral-900/50 p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/20">
                <Globe className="h-6 w-6 text-lime-300" />
              </div>
              <h3 className="text-2xl font-bold text-white">Online Detector</h3>
            </div>
            <ul className="space-y-3">
              {onlineFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-lime-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* App Column */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <Download className="h-6 w-6 text-white/60" />
              </div>
              <h3 className="text-2xl font-bold text-white">Traditional App</h3>
            </div>
            <ul className="space-y-3">
              {appFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-white/60">
                  <X className="h-5 w-5 text-white/40" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
