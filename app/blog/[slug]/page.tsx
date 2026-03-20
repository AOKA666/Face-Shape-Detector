import Link from "next/link"
import type { ReactNode } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BLOG_POSTS, getBlogPostBySlug, getRelatedPosts } from "@/lib/blog-posts"
import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"

export const dynamic = "force-static"

type BlogPostPageProps = {
  params: { slug: string }
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://www.yourface.online/blog/${post.slug}`,
    },
  }
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
    }
    return <span key={`${part}-${index}`}>{part}</span>
  })
}

function renderMarkdown(content: string): ReactNode[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n")
  const blocks: ReactNode[] = []
  let paragraphBuffer: string[] = []
  let unorderedListBuffer: string[] = []
  let orderedListBuffer: string[] = []

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return
    const text = paragraphBuffer.join(" ").trim()
    if (text) {
      blocks.push(
        <p key={`p-${blocks.length}`} className="text-base leading-8 text-neutral-200">
          {renderInline(text)}
        </p>,
      )
    }
    paragraphBuffer = []
  }

  const flushUnorderedList = () => {
    if (!unorderedListBuffer.length) return
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="list-disc space-y-2 pl-6 text-neutral-200">
        {unorderedListBuffer.map((item, index) => (
          <li key={`uli-${index}`}>{renderInline(item)}</li>
        ))}
      </ul>,
    )
    unorderedListBuffer = []
  }

  const flushOrderedList = () => {
    if (!orderedListBuffer.length) return
    blocks.push(
      <ol key={`ol-${blocks.length}`} className="list-decimal space-y-2 pl-6 text-neutral-200">
        {orderedListBuffer.map((item, index) => (
          <li key={`oli-${index}`}>{renderInline(item)}</li>
        ))}
      </ol>,
    )
    orderedListBuffer = []
  }

  const flushAll = () => {
    flushParagraph()
    flushUnorderedList()
    flushOrderedList()
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      flushAll()
      continue
    }

    if (line.startsWith("### ")) {
      flushAll()
      blocks.push(
        <h3 key={`h3-${blocks.length}`} className="mt-8 text-xl font-semibold text-white">
          {renderInline(line.slice(4).trim())}
        </h3>,
      )
      continue
    }

    if (line.startsWith("## ")) {
      flushAll()
      blocks.push(
        <h2 key={`h2-${blocks.length}`} className="mt-10 text-2xl font-bold text-white">
          {renderInline(line.slice(3).trim())}
        </h2>,
      )
      continue
    }

    if (line.startsWith("# ")) {
      flushAll()
      blocks.push(
        <h2 key={`h1-as-h2-${blocks.length}`} className="mt-10 text-2xl font-bold text-white">
          {renderInline(line.slice(2).trim())}
        </h2>,
      )
      continue
    }

    if (line.startsWith("- ")) {
      flushParagraph()
      flushOrderedList()
      unorderedListBuffer.push(line.slice(2).trim())
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      flushParagraph()
      flushUnorderedList()
      orderedListBuffer.push(line.replace(/^\d+\.\s/, "").trim())
      continue
    }

    paragraphBuffer.push(line)
  }

  flushAll()
  return blocks
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const relatedPosts = getRelatedPosts(post.slug)

  return (
    <main className="min-h-[100dvh] text-white">
      <SiteHeader />
      <article className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <p className="text-xs uppercase tracking-wider text-lime-300">{post.category}</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-neutral-400">
          {post.publishedAt} | {post.readingTime} min read
        </p>

        <div className="mt-8 space-y-5">{renderMarkdown(post.content)}</div>

        {relatedPosts.length > 0 && (
          <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-semibold text-white">Recommended Reading</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-lime-300/50 hover:bg-white/10"
                >
                  <p className="text-xs uppercase tracking-wider text-lime-300">{relatedPost.category}</p>
                  <p className="mt-2 text-base font-semibold text-white">{relatedPost.title}</p>
                  <p className="mt-2 text-sm text-neutral-300">{relatedPost.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
      <AppverseFooter showLatestArticles={false} />
    </main>
  )
}
