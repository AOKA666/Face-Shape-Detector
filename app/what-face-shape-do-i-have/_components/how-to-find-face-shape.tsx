"use client"

import Image from "next/image"
import { useState } from "react"
import { Ruler, Zap, X } from "lucide-react"

export function HowToFindFaceShape() {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)

  const methods = [
    {
      icon: <Ruler className="h-6 w-6 text-lime-300" />,
      title: "Manual Method",
      description:
        "You can determine your face shape by taking measurements and analyzing proportions. Follow these precise measurement steps for consistent results.",
      steps: [
        {
          text: "Pull all hair back tightly to expose the entire hairline and facial contour without any obstruction.",
          image: { src: "step1.png", alt: "Hair pulled back to fully expose hairline" },
        },
        {
          text: "Measure the forehead width: the straight distance between the widest points on both sides of the forehead (above the brow bones).",
          image: { src: "step2.png", alt: "Measuring forehead width at widest points" },
        },
        {
          text: "Measure the cheekbone width: the straight distance between the two most prominent points of the cheekbones (the widest part of most faces).",
          image: { src: "step3.png", alt: "Measuring cheekbone width at the most prominent points" },
        },
        {
          text: "Measure the jawline width: the straight distance between the outer endpoints of the mandibular angles below both ears.",
          image: { src: "step4.png", alt: "Measuring jawline width between mandibular angles" },
        },
        {
          text: "Measure the total face length: the vertical straight distance from the midpoint of the hairline to the tip of the chin.",
          image: { src: "step5.png", alt: "Measuring total face length from hairline to chin" },
        },
        {
          text: "Compare the ratios of the maximum facial width to the total face length, and combine the contour of the jaw/chin to judge the face shape.",
          image: { src: "step6.png", alt: "Comparing facial width-to-length ratios with jaw contour" },
        },
      ],
    },
    {
      icon: <Zap className="h-6 w-6 text-lime-300" />,
      title: "Using AI Tools",
      description: "Modern AI-powered face shape detectors can instantly analyze your face shape from a photo. Simply upload a clear, front-facing photo and get accurate results based on facial landmarks and proportions. This is the fastest and most convenient method.",
      benefits: [
        "Instant results",
        "Highly accurate analysis",
        "No measurements needed",
        "Works with any clear photo",
      ],
    },
  ]

  return (
    <>
      <section className="relative isolate overflow-hidden py-20 bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">How to Find Your Face Shape</h2>
            <p className="mt-4 text-lg text-white/60">
              Two main methods to discover your face shape
            </p>
          </div>
          <div className="space-y-8">
            {methods.map((method, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/20">
                    {method.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{method.title}</h3>
                </div>
                <p className="mb-6 text-white/60">{method.description}</p>
                {method.steps && (
                  <div className="space-y-4">
                    {method.steps.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col md:flex-row md:items-center gap-4 rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white/80"
                      >
                        <div className="flex-1 flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-lime-400 flex-shrink-0" />
                          <span>{item.text}</span>
                        </div>
                        <div
                          className="relative w-full h-48 md:w-72 md:h-48 overflow-hidden rounded-lg bg-white/10 cursor-zoom-in"
                          title="Click to enlarge"
                          onClick={() => setLightboxImage({ src: item.image.src, alt: item.image.alt })}
                        >
                          <Image
                            src={`/images/my-face-shape/${item.image.src}`}
                            alt={item.image.alt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 90vw, 288px"
                            priority={i === 0}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {method.benefits && (
                  <div className="space-y-2">
                    {method.benefits.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/80"
                      >
                        <span className="mt-0.5 h-2 w-2 rounded-full bg-lime-400 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setLightboxImage(null)}
          role="button"
          aria-label="Close enlarged image"
        >
          <div
            className="relative max-w-4xl w-full aspect-[4/3] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/images/my-face-shape/${lightboxImage.src}`}
              alt={lightboxImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute -top-3 -right-3 inline-flex items-center justify-center rounded-full bg-white text-black p-2 shadow-lg"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
