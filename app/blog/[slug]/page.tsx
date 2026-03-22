import Link from "next/link"
import type { ReactNode } from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { notFound } from "next/navigation"
import { BLOG_POSTS, getBlogPostBySlug, getRelatedPosts } from "@/lib/blog-posts"
import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { FaceDetectorCTA } from "@/components/face-detector-cta"

export const dynamic = "force-static"

type BlogPostPageProps = {
  params: { slug: string }
}

type CtaConfig = {
  href: string
  ctaText: string
  title: string
  description: string
}

type TocItem = {
  id: string
  title: string
  level: 2 | 3
}

const DEFAULT_CTA: CtaConfig = {
  href: "/face-shape-detector-online",
  ctaText: "Try the Face Shape Detector",
  title: "Find Your Face Shape Online",
  description: "Use our AI face shape detector online to get fast, consistent results from a clear photo.",
}

const CTA_BY_SLUG: Record<string, CtaConfig> = {
  "how-to-tell-your-face-shape-from-a-selfie": {
    href: "/face-shape-detector-from-photo",
    ctaText: "Upload a Photo to Detect Your Face Shape",
    title: "Detect Your Face Shape From a Selfie",
    description: "Use a clean photo and let our AI face shape analysis classify your proportions in seconds.",
  },
  "what-face-shape-do-i-have-a-simple-step-by-step-guide": {
    href: "/what-face-shape-do-i-have",
    ctaText: "Find Your Face Shape Online",
    title: "Still Asking What Face Shape You Have?",
    description: "Jump to our dedicated tool page to identify your face shape with guided checks and AI support.",
  },
  "best-beard-styles-for-your-face-shape": {
    href: "/face-shape-detector-for-men",
    ctaText: "Try the Face Shape Detector for Men",
    title: "Get Beard Suggestions Based on Your Face Shape",
    description: "Identify your face shape first, then pick beard styles that add balance instead of bulk.",
  },
}

function normalizeHeadingText(text: string) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim()
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function getTocItems(content: string): TocItem[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n")
  const slugCount = new Map<string, number>()
  const items: TocItem[] = []

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!(line.startsWith("## ") || line.startsWith("### "))) continue

    const level: 2 | 3 = line.startsWith("### ") ? 3 : 2
    const title = normalizeHeadingText(line.slice(level === 2 ? 3 : 4))
    if (!title) continue

    const baseSlug = slugifyHeading(title) || "section"
    const currentCount = slugCount.get(baseSlug) ?? 0
    slugCount.set(baseSlug, currentCount + 1)
    const id = currentCount === 0 ? baseSlug : `${baseSlug}-${currentCount + 1}`

    items.push({ id, title, level })
  }

  return items
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
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g)
  return parts
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (match) {
          const [, label, href] = match
          const isExternal = href.startsWith("http://") || href.startsWith("https://")
          if (isExternal) {
            return (
              <a
                key={`${part}-${index}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-300 underline decoration-lime-300/50 underline-offset-4 hover:text-lime-200"
              >
                {label}
              </a>
            )
          }

          return (
            <Link
              key={`${part}-${index}`}
              href={href}
              className="text-lime-300 underline decoration-lime-300/50 underline-offset-4 hover:text-lime-200"
            >
              {label}
            </Link>
          )
        }
      }

      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
      }

      return <span key={`${part}-${index}`}>{part}</span>
    })
}

function renderMarkdown(content: string, tocItems: TocItem[]): ReactNode[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n")
  const blocks: ReactNode[] = []
  let tocIndex = 0
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
      const tocItem = tocItems[tocIndex]
      if (tocItem?.level === 3) tocIndex += 1
      blocks.push(
        <h3
          id={tocItem?.level === 3 ? tocItem.id : undefined}
          key={`h3-${blocks.length}`}
          className="mt-8 scroll-mt-24 text-xl font-semibold text-white"
        >
          {renderInline(line.slice(4).trim())}
        </h3>,
      )
      continue
    }

    if (line.startsWith("## ")) {
      flushAll()
      const tocItem = tocItems[tocIndex]
      if (tocItem?.level === 2) tocIndex += 1
      blocks.push(
        <h2
          id={tocItem?.level === 2 ? tocItem.id : undefined}
          key={`h2-${blocks.length}`}
          className="mt-10 scroll-mt-24 text-2xl font-bold text-white"
        >
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
  const ctaConfig = CTA_BY_SLUG[post.slug] ?? DEFAULT_CTA
  const tocItems = getTocItems(post.content)
  const shouldShowToc = tocItems.length >= 4 && post.readingTime >= 4

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.yourface.online/blog/${post.slug}`,
    },
    author: {
      "@type": "Organization",
      name: "YourFace Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "YourFace Online",
      logo: {
        "@type": "ImageObject",
        url: "https://www.yourface.online/favicon.ico",
      },
    },
    url: `https://www.yourface.online/blog/${post.slug}`,
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <article className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
          <p className="text-xs uppercase tracking-wider text-lime-300">{post.category}</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-neutral-400">
            {post.publishedAt} | {post.readingTime} min read
          </p>

          {shouldShowToc && (
            <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-lime-300">On This Page</h2>
              <ul className="mt-3 space-y-2">
                {tocItems.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
                    <Link
                      href={`#${item.id}`}
                      className="text-sm text-neutral-200 transition hover:text-lime-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-8 space-y-5">{renderMarkdown(post.content, tocItems)}</div>

          <FaceDetectorCTA
            title={ctaConfig.title}
            description={ctaConfig.description}
            ctaText={ctaConfig.ctaText}
            href={ctaConfig.href}
          />

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

      <Script
        id={`blog-posting-schema-${post.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
    </>
  )
}
