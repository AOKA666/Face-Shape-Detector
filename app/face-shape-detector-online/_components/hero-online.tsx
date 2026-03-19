import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Scan } from "lucide-react"

export function HeroOnline() {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <Image
        src="/images/online/hero.png"
        alt="Online face shape detector preview in browser"
        fill
        className="object-cover opacity-80"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/60" />
      <div className="container relative mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">Face Shape Detector Online</p>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Face Shape Detector Online
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
            Use directly in your browser - no downloads, no installations, instant results
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              asChild
              className="bg-lime-400 text-black font-medium rounded-lg px-8 py-3
                       hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                       transition-all"
            >
              <Link href="/#hero">Try Online Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
