import Link from "next/link"
import type { Metadata } from "next"
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-posts"
import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Face Shape Blog | Hairstyles, Glasses & Styling Guides",
  description:
    "Explore face shape guides, hairstyle ideas, glasses tips, beard advice, and AI face shape analysis articles.",
  alternates: {
    canonical: "https://www.yourface.online/blog",
  },
}

type HubSection = {
  title: string
  description: string
  slugs: string[]
}

const hubSections: HubSection[] = [
  {
    title: "Featured Posts",
    description: "Start here for practical step-by-step guides and confidence checks.",
    slugs: [
      "what-face-shape-do-i-have-a-simple-step-by-step-guide",
      "how-to-tell-your-face-shape-from-a-selfie",
    ],
  },
  {
    title: "Face Shape Basics",
    description: "Understand your proportions before choosing styles.",
    slugs: [
      "what-face-shape-do-i-have-a-simple-step-by-step-guide",
      "how-accurate-are-ai-face-shape-detectors",
    ],
  },
  {
    title: "Hairstyles by Face Shape",
    description: "Haircut recommendations by round, square, and oval face patterns.",
    slugs: [
      "best-hairstyles-for-round-face-shape",
      "best-hairstyles-for-square-face-shape",
      "best-hairstyles-for-oval-face-shape",
    ],
  },
  {
    title: "Styling & Accessories",
    description: "Glasses and beard guides to add balance and structure.",
    slugs: ["best-glasses-for-your-face-shape", "best-beard-styles-for-your-face-shape"],
  },
  {
    title: "AI Analysis",
    description: "Know what affects AI face shape analysis quality and reliability.",
    slugs: [
      "how-accurate-are-ai-face-shape-detectors",
      "how-to-tell-your-face-shape-from-a-selfie",
    ],
  },
]

function findPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-lime-300/50 hover:bg-white/10"
    >
      <p className="text-xs uppercase tracking-wider text-lime-300">{post.category}</p>
      <h3 className="mt-2 text-lg font-semibold text-white">{post.title}</h3>
      <p className="mt-2 text-sm text-neutral-300">{post.excerpt}</p>
      <p className="mt-3 text-xs text-neutral-400">
        {post.publishedAt} | {post.readingTime} min read
      </p>
    </Link>
  )
}

export default function BlogPage() {
  return (
    <main className="min-h-[100dvh] text-white">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <h1 className="text-3xl font-bold sm:text-4xl">Face Shape Guides</h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-300 sm:text-base">
          Explore face shape guides, hairstyle ideas, glasses tips, beard advice, and AI face shape analysis articles.
        </p>

        <div className="mt-10 space-y-10">
          {hubSections.map((section) => {
            const posts = section.slugs.map(findPost).filter((post): post is BlogPost => Boolean(post))
            return (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                <p className="mt-2 text-sm text-neutral-300">{section.description}</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <PostCard key={`${section.title}-${post.slug}`} post={post} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        <section className="mt-12 border-t border-white/10 pt-8">
          <h2 className="text-2xl font-semibold text-white">All Articles</h2>
          <p className="mt-2 text-sm text-neutral-300">Direct access to all 8 published face shape guides.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <PostCard key={`all-${post.slug}`} post={post} />
            ))}
          </div>
        </section>
      </section>
      <AppverseFooter showLatestArticles={false} />
    </main>
  )
}
