import Image from "next/image"
import { Upload, Cpu, FileCheck } from "lucide-react"

const steps = [
  {
    icon: Upload,
    step: "Step 1",
    title: "Upload a Clear Face Photo",
    description: "Choose a well-lit photo where your face is clearly visible.",
    image: { src: "select.png", alt: "Uploading a face photo to the analyzer" },
  },
  {
    icon: Cpu,
    step: "Step 2",
    title: "Let AI Analyze Your Face Shape",
    description: "Our AI processes your photo and identifies key facial features.",
    image: { src: "analysis.png", alt: "AI analyzing the uploaded face photo" },
  },
  {
    icon: FileCheck,
    step: "Step 3",
    title: "Get Your Face Shape & Style Tips",
    description: "Receive your face shape analysis with personalized styling recommendations.",
    image: { src: "result.png", alt: "Face shape result with styling tips" },
  },
]

export function HowToUse() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        How to Use the AI Face Shape Detector Online
      </h2>

      <div className="space-y-12">
        {steps.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row md:items-stretch gap-6 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="relative w-full md:w-1/2 h-[280px] md:h-[380px] overflow-hidden rounded-2xl bg-white/5">
              <Image
                src={`/images/usage/${item.image.src}`}
                alt={item.image.alt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                priority={index === 0}
              />
            </div>

            <div className="w-full md:w-1/2 h-[280px] md:h-[380px] rounded-2xl border border-white/15 bg-neutral-900/60 p-8 flex flex-col justify-center text-left md:text-left">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-lime-300/10 ring-2 ring-lime-300/30">
                <item.icon className="h-8 w-8 text-lime-300" />
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-lime-300">{item.step}</p>
              <h3 className="mb-3 text-xl sm:text-2xl font-bold text-white whitespace-nowrap">{item.title}</h3>
              <p className="text-base text-neutral-200 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
