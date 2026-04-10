import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon } from "lucide-react"

export function HeroFromPhoto() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">Face Shape Detector from Photo</p>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Detect Your Face Shape From a Photo
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-white/70 sm:text-lg">
            Upload a clear photo to get a fast face shape read. Then use that result for better men's haircut, beard, and glasses decisions instead of guessing off the mirror.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              className="bg-lime-400 text-black font-medium rounded-lg px-8 py-3
                         hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                         transition-all"
            >
              <Link href="/#hero">Upload Photo</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 bg-black/20 text-white hover:bg-white/10 hover:text-lime-300">
              <Link href="/mens-hairstyles-by-face-shape">See Men&apos;s Haircuts by Face Shape</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
