import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scan } from "lucide-react"

export function ToolCTA() {
  return (
    <section className="relative isolate overflow-hidden py-20 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-400/20">
            <Scan className="h-8 w-8 text-lime-300" />
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Try Our Face Shape Detector</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
            Get instant, accurate face shape analysis with our AI-powered tool. If you are making men&apos;s haircut or beard decisions, use the male-first path after you get your result.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              className="bg-lime-400 text-black font-medium rounded-lg px-8 py-3
                         hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                         transition-all"
            >
              <Link href="/#hero">Detect Face Shape Now</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 bg-black/20 text-white hover:bg-white/10 hover:text-lime-300">
              <Link href="/face-shape-detector-for-men">Use the Men&apos;s Version</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
