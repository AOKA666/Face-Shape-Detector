"use client"

import Link from "next/link"
import { ArrowRight, Image as ImageIcon, HelpCircle } from "lucide-react"

export function InternalLinks() {
  const links = [
    {
      title: "From Photo",
      description: "Upload any photo to get instant face shape analysis",
      icon: <ImageIcon className="h-6 w-6 text-white/60 group-hover:text-lime-300 transition-colors" />,
      href: "/#hero",
    },
    {
      title: "What Face Shape Do I Have",
      description: "Learn about different face shapes and how to identify yours",
      icon: <HelpCircle className="h-6 w-6 text-white/60 group-hover:text-lime-300 transition-colors" />,
      href: "/#face-shapes-explained",
    },
  ]

  return (
    <section className="relative isolate overflow-hidden py-20 bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Related Resources</h2>
          <p className="mt-4 text-lg text-white/60">
            Explore more about face shapes and analysis
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="group rounded-2xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm
                         hover:border-lime-400/50 hover:bg-lime-400/5 transition-all"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 group-hover:bg-lime-400/20 transition-colors">
                {link.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white group-hover:text-lime-300 transition-colors">
                {link.title}
              </h3>
              <p className="mb-4 text-white/60">{link.description}</p>
              <div className="flex items-center gap-2 text-lime-300 text-sm font-medium">
                Learn more
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
