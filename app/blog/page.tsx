import Link from "next/link"
import type { Metadata } from "next"
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-posts"
import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Face Shape Guides | Hairstyles, Glasses & Styling Tips",
  description:
    "Browse face shape guides for basics, hairstyles, glasses, beard grooming, and AI analysis tips.",
  alternates: {
    canonical: "https://www.yourface.online/blog",
  },
}

type HubSection = {
  id: string
  title: string
  description: string
  slugs: string[]
}

const hubSections: HubSection[] = [
  {
    id: "featured",
    title: "Featured Guides",
    description: "Start with these core articles to identify your face shape and apply practical styling decisions.",
    slugs: [
      "what-face-shape-do-i-have-a-simple-step-by-step-guide",
      "how-to-tell-your-face-shape-from-a-selfie",
      "face-shape-types-explained",
      "best-glasses-for-your-face-shape",
    ],
  },
  {
    id: "basics",
    title: "Face Shape Basics",
    description: "Foundational definitions, measurement logic, and common misclassification fixes.",
    slugs: [
      "what-face-shape-do-i-have-a-simple-step-by-step-guide",
      "how-to-tell-your-face-shape-from-a-selfie",
      "face-shape-types-explained",
    ],
  },
  {
    id: "hairstyles",
    title: "Hairstyles by Face Shape",
    description: "Haircut strategy by round, square, and oval face structures.",
    slugs: [
      "best-hairstyles-for-round-face-shape",
      "best-hairstyles-for-square-face-shape",
      "best-hairstyles-for-oval-face-shape",
    ],
  },
  {
    id: "glasses",
    title: "Glasses & Accessories",
    description: "Frame and accessory direction based on facial proportion and balance.",
    slugs: ["best-glasses-for-your-face-shape"],
  },
  {
    id: "beard",
    title: "Beard & Grooming",
    description: "Grooming decisions that reshape lower-face perception and jawline balance.",
    slugs: ["best-beard-styles-for-your-face-shape"],
  },
  {
    id: "ai-analysis",
    title: "AI & Analysis",
    description: "Understand model confidence, input quality, and practical accuracy limits.",
    slugs: ["how-accurate-are-ai-face-shape-detectors"],
  },
]

function findPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-5 transition hover:border-lime-300/55 hover:bg-white/[0.08]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-lime-300/30 bg-lime-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-lime-300">
          {post.category}
        </span>
        <span className="text-xs text-neutral-400">{post.readingTime} min read</span>
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-7 text-white">
        <Link href={`/blog/${post.slug}`} className="hover:text-lime-300 transition-colors">
          {post.title}
        </Link>
      </h3>

      <p className="mt-3 text-sm leading-7 text-neutral-300">{post.excerpt}</p>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-xs uppercase tracking-wider text-neutral-400">{post.publishedAt}</span>
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-medium text-lime-300 transition hover:text-lime-200"
        >
          Read guide
        </Link>
      </div>
    </article>
  )
}

export default function BlogPage() {
  return (
    <main className="min-h-[100dvh] text-white">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <header className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Face Shape Guides | Hairstyles, Glasses & Styling Tips</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-neutral-300 sm:text-base">
            A structured content hub for face shape basics, hairstyle direction, frame selection, beard grooming,
            and AI analysis reliability. Use section anchors below to jump directly to the topic you need.
          </p>

          <nav className="mt-6 flex flex-wrap gap-2" aria-label="Blog hub sections">
            {hubSections.map((section) => (
              <Link
                key={section.id}
                href={`/blog#${section.id}`}
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 transition hover:border-lime-300/50 hover:text-lime-300"
              >
                {section.title}
              </Link>
            ))}
          </nav>
        </header>

        <div className="mt-10 space-y-10">
          {hubSections.map((section) => {
            const posts = section.slugs.map(findPost).filter((post): post is BlogPost => Boolean(post))
            return (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-neutral-300">{section.description}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-xs text-neutral-300">
                    {posts.length} article{posts.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <PostCard key={`${section.id}-${post.slug}`} post={post} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </section>
      <AppverseFooter showLatestArticles={false} />
    </main>
  )
}
