import Link from "next/link"

type FaceDetectorCTAProps = {
  title: string
  description: string
  ctaText: string
  href: string
}

export function FaceDetectorCTA({ title, description, ctaText, href }: FaceDetectorCTAProps) {
  return (
    <section className="mt-10 rounded-3xl border border-lime-300/20 bg-gradient-to-br from-lime-400/10 via-emerald-400/5 to-transparent p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm text-neutral-300 sm:text-base">{description}</p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center rounded-full bg-lime-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-lime-300"
      >
        {ctaText}
      </Link>
    </section>
  )
}
