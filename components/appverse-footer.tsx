"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Twitter, Youtube, Instagram, Scan, ArrowRight, BookOpen, Sparkles, Users } from "lucide-react"

const blogPosts = [
  {
    title: "How to Determine Your Face Shape: A Complete Guide",
    description: "Learn the step-by-step process to identify your face shape and why it matters for your style.",
    category: "Guide",
    icon: BookOpen,
    href: "#blog-1",
  },
  {
    title: "Best Hairstyles for Every Face Shape in 2025",
    description: "Discover trending hairstyles that perfectly complement your unique face shape.",
    category: "Trends",
    icon: Sparkles,
    href: "#blog-2",
  },
  {
    title: "Makeup Tips Based on Your Face Shape",
    description: "Expert contouring and highlighting techniques to enhance your natural features.",
    category: "Beauty",
    icon: Users,
    href: "#blog-3",
  },
]

export function AppverseFooter() {
  return (
    <section className="text-white">
      {/* Contact CTA */}
      <div className="container mx-auto px-4 pt-12 sm:pt-16">
        <div className="flex justify-center">
          <Button
            asChild
            className="rounded-full bg-lime-400 px-6 py-2 text-sm font-medium text-black shadow-[0_0_20px_rgba(163,230,53,0.35)] hover:bg-lime-300"
          >
            <a href="#hero">Try Face Detection Now</a>
          </Button>
        </div>
      </div>

      <div id="blog" className="container mx-auto px-4 py-12 sm:py-16">
        <Card className="relative overflow-hidden rounded-3xl liquid-glass p-6 sm:p-10">
          <div className="relative">
            {/* Section Header */}
            <div className="text-center mb-8">
              <p className="mb-2 text-[11px] tracking-widest text-lime-300">LATEST ARTICLES</p>
              <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                Learn More About Face Shapes & Styling
              </h3>
              <p className="mt-2 max-w-2xl mx-auto text-sm text-neutral-400">
                Explore our expert guides on face shape analysis, hairstyle recommendations, and beauty tips
              </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid gap-4 md:grid-cols-3">
              {blogPosts.map((post, index) => (
                <Link
                  key={index}
                  href={post.href}
                  className="group relative rounded-2xl liquid-glass p-5 transition-all hover:bg-white/5 hover:ring-1 hover:ring-lime-300/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-400/10">
                      <post.icon className="h-5 w-5 text-lime-400" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-wider text-lime-300">{post.category}</span>
                      <h4 className="mt-1 text-sm font-semibold text-white group-hover:text-lime-300 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="mt-1 text-xs text-neutral-400 line-clamp-2">{post.description}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-lime-400 group-hover:text-lime-300">
                    Read more <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-6 text-center">
              <Button
                asChild
                variant="outline"
                className="rounded-full border-lime-400/30 text-lime-400 hover:bg-lime-400/10 hover:text-lime-300 bg-transparent"
              >
                <Link href="#all-blogs">
                  View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 pb-20 md:pb-10">
        <div className="container mx-auto px-4 py-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5">
                <Scan className="h-6 w-6 text-lime-400" />
                <span className="text-xl font-semibold text-white">FaceDetector</span>
              </div>
              <p className="max-w-sm text-sm text-neutral-400">
                AI-powered face shape detection tool. Get instant analysis and personalized styling recommendations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-2">
              <div>
                <h5 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">Navigation</h5>
                <ul className="space-y-2 text-sm text-neutral-300">
                  {["Home", "Features", "How It Works", "Face Shapes", "FAQ", "Blog"].map((item) => (
                    <li key={item}>
                      <Link href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-lime-300">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">Social media</h5>
                <ul className="space-y-2 text-sm text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-neutral-400" />
                    <a href="#" className="hover:text-lime-300" aria-label="Follow FaceDetector on Twitter">
                      X/Twitter
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Youtube className="h-4 w-4 text-neutral-400" />
                    <a href="#" className="hover:text-lime-300" aria-label="Subscribe to FaceDetector on YouTube">
                      YouTube
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-neutral-400" />
                    <a href="#" className="hover:text-lime-300" aria-label="Follow FaceDetector on Instagram">
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row">
            <p>© {new Date().getFullYear()} FaceDetector. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#privacy" className="hover:text-lime-300">
                Privacy Policy
              </Link>
              <Link href="#terms" className="hover:text-lime-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
