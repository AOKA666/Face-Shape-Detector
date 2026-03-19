import Link from "next/link"
import type { Metadata } from "next"
import { BLOG_POSTS } from "@/lib/blog-posts"
import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Blog | FaceDetector",
  description: "Face shape guides, hairstyle trends, and practical styling advice.",
  alternates: {
    canonical: "https://www.yourface.online/blog",
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-[100dvh] text-white">
      <SiteHeader />
      <section className="container mx-auto px-4 py-10 sm:py-14">
        <h1 className="text-3xl font-bold sm:text-4xl">Blog</h1>
        <p className="mt-2 text-sm text-neutral-300 sm:text-base">
          Actionable guides on face shape analysis, hairstyles, and makeup choices.
        </p>

        <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-lime-300/50 hover:bg-white/10"
            >
              <p className="text-xs uppercase tracking-wider text-lime-300">{post.category}</p>
              <h2 className="mt-2 text-lg font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-neutral-300">{post.excerpt}</p>
              <p className="mt-3 text-xs text-neutral-400">
                {post.publishedAt} · {post.readingTime} min read
              </p>
            </Link>
          ))}
        </div>
      </section>
      <AppverseFooter showLatestArticles={false} />
    </main>
  )
}
