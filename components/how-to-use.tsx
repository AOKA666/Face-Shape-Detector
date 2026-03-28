import { Upload, Cpu, FileCheck } from "lucide-react"

const steps = [
  {
    icon: Upload,
    step: "Step 1",
    title: "Upload a Clear Face Photo",
    description: "Choose a well-lit photo where your face is clearly visible.",
  },
  {
    icon: Cpu,
    step: "Step 2",
    title: "Let AI Analyze Your Face Shape",
    description: "Our AI processes your photo and identifies key facial features.",
  },
  {
    icon: FileCheck,
    step: "Step 3",
    title: "Get Your Face Shape & Style Tips",
    description: "Receive your face shape analysis with personalized styling recommendations.",
  },
]

export function HowToUse() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:whitespace-nowrap">
        How It Works
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((item, index) => (
          <div
            key={index}
            className="w-full"
          >
            <div className="rounded-2xl border border-white/15 bg-neutral-900/60 p-6 flex h-full flex-col items-center text-center">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-lime-300/10 ring-2 ring-lime-300/30">
                <item.icon className="h-5 w-5 text-lime-300" />
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-lime-300">{item.step}</p>
              <h3 className="mb-3 text-lg sm:text-xl font-bold text-white">{item.title}</h3>
              <p className="text-sm text-neutral-200 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
