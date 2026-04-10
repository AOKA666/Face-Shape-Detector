import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroMen() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/for-man/hero-man.png"
          alt="Stylish man looking toward the camera, highlighting masculine grooming"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-neutral-900/70" />
      </div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">Face Shape Detector for Men</p>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Face Shape Detector for Men: Find the Best Haircut, Beard, and Glasses
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-white/70 sm:text-lg">
            Upload a clear photo to identify your face shape, then use that result to choose better men's haircuts, beard styles, and frame shapes without guessing.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              className="bg-lime-400 text-black font-medium rounded-lg px-8 py-3
                         hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                         transition-all"
            >
              <Link href="/#hero">Upload Your Photo</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 bg-black/20 text-white hover:bg-white/10 hover:text-lime-300">
              <Link href="/mens-hairstyles-by-face-shape">Explore Men&apos;s Haircuts</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
