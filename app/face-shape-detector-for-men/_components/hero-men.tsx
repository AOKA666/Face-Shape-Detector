import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

export function HeroMen() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">Face Shape Detector for Men</p>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Face Shape Detector for Men
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
            Find your face shape and discover the best hairstyles that complement your features
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              asChild
              className="bg-lime-400 text-black font-medium rounded-lg px-8 py-3
                         hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                         transition-all"
            >
              <Link href="/#hero">Upload Your Photo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
