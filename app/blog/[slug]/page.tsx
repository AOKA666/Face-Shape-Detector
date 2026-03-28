import Link from "next/link"
import type { ReactNode } from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { notFound } from "next/navigation"
import { BLOG_POSTS, getBlogPostBySlug, getRelatedPosts } from "@/lib/blog-posts"
import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { FaceDetectorCTA } from "@/components/face-detector-cta"
import { BlogCallout } from "@/components/blog-callout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

type FaqItem = {
  question: string
  answer: string
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
  "face-shape-types-explained": {
    href: "/what-face-shape-do-i-have",
    ctaText: "Check Your Face Shape Step by Step",
    title: "Need a Structured Face Shape Check?",
    description: "Use our guided tool page to compare proportions and confirm your face shape with AI support.",
  },
  "best-glasses-for-your-face-shape": {
    href: "/face-shape-detector-online",
    ctaText: "Detect Your Face Shape Before Choosing Frames",
    title: "Find Your Face Shape First",
    description: "Run a quick analysis so your next frame choice starts from accurate proportions.",
  },
  "best-hairstyles-for-round-face-shape": {
    href: "/face-shape-detector-for-women",
    ctaText: "Try the Face Shape Styling Tool",
    title: "Validate Round vs Oval Before Your Next Cut",
    description: "Use AI-assisted checks to avoid haircut decisions based on wrong face shape assumptions.",
  },
  "best-hairstyles-for-square-face-shape": {
    href: "/face-shape-detector-for-men",
    ctaText: "Try the Face Shape Detector for Men",
    title: "Confirm Square vs Oblong in Seconds",
    description: "Use a clean photo to verify your shape and choose a cut that matches your proportions.",
  },
  "best-hairstyles-for-oval-face-shape": {
    href: "/face-shape-detector-for-women",
    ctaText: "Try the Face Shape Detector for Women",
    title: "Confirm Oval Face Shape Before Styling",
    description: "Check your proportions first, then pick an oval-friendly cut with more confidence.",
  },
  "best-beard-styles-for-your-face-shape": {
    href: "/face-shape-detector-for-men",
    ctaText: "Try the Face Shape Detector for Men",
    title: "Get Beard Suggestions Based on Your Face Shape",
    description: "Identify your face shape first, then pick beard styles that add balance instead of bulk.",
  },
  "how-accurate-are-ai-face-shape-detectors": {
    href: "/face-shape-detector-from-photo",
    ctaText: "Test Detector Accuracy With Your Photo",
    title: "Run Your Own Accuracy Check",
    description: "Upload a clean front-facing image and compare AI output with manual measurement logic.",
  },
}

const FAQ_BY_SLUG: Partial<Record<string, FaqItem[]>> = {
  "how-to-tell-your-face-shape-from-a-selfie": [
    {
      question: "Can I use a regular phone selfie for face shape analysis?",
      answer:
        "Yes. Use a front-facing photo with neutral expression, good light, and hair pulled away from your forehead and jawline.",
    },
    {
      question: "How do I confirm my selfie-based result?",
      answer:
        "Run a second check with [face shape detector from photo](/face-shape-detector-from-photo) and compare the overlap.",
    },
  ],
  "best-glasses-for-your-face-shape": [
    {
      question: "Should I prioritize face shape or frame trend?",
      answer:
        "Prioritize fit and face-shape balance first, then trend. Trend-only choices often look less balanced in daily wear.",
    },
    {
      question: "How can I reduce wrong frame purchases?",
      answer:
        "Start with [face shape detector online](/face-shape-detector-online), shortlist frame geometries, then test in-store.",
    },
  ],
}

function getFaqItems(postSlug: string): FaqItem[] {
  return (
    FAQ_BY_SLUG[postSlug] ?? [
      {
        question: "How should I apply this guide to my own face shape?",
        answer:
          "Use the checklist in the article, then validate with a clear front-facing photo so your decisions are based on proportions, not guesswork.",
      },
      {
        question: "Can I verify these recommendations with an AI tool?",
        answer:
          "Yes. Use [face shape detector online](/face-shape-detector-online) or [what face shape do I have](/what-face-shape-do-i-have) to confirm before making style changes.",
      },
      {
        question: "What should I read next after this article?",
        answer:
          "Continue with one of the related guides below to build a full hairstyle, glasses, or grooming plan.",
      },
    ]
  )
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

    const rawTitle = line.startsWith("### ") ? line.slice(4) : line.slice(3)
    const title = normalizeHeadingText(rawTitle)
    if (!title) continue
    const level: 2 | 3 =
      line.startsWith("### ") || /^\d+\.\s/.test(title) ? 3 : 2

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
  let skippedFirstTitle = false

  let paragraphBuffer: string[] = []
  let unorderedListBuffer: string[] = []
  let orderedListBuffer: string[] = []
  let blockquoteBuffer: string[] = []

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return
    const text = paragraphBuffer.join(" ").trim()
    if (text) {
      blocks.push(
        <p key={`p-${blocks.length}`} className="my-5 text-[17px] leading-8 text-neutral-300">
          {renderInline(text)}
        </p>,
      )
    }
    paragraphBuffer = []
  }

  const flushUnorderedList = () => {
    if (!unorderedListBuffer.length) return
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="my-6 list-disc pl-6 text-neutral-200 marker:text-lime-300">
        {unorderedListBuffer.map((item, index) => (
          <li key={`uli-${index}`} className="my-1 leading-7">{renderInline(item)}</li>
        ))}
      </ul>,
    )
    unorderedListBuffer = []
  }

  const flushOrderedList = () => {
    if (!orderedListBuffer.length) return
    blocks.push(
      <ol key={`ol-${blocks.length}`} className="my-6 list-decimal pl-6 text-neutral-200 marker:text-lime-300">
        {orderedListBuffer.map((item, index) => (
          <li key={`oli-${index}`} className="my-1 leading-7">{renderInline(item)}</li>
        ))}
      </ol>,
    )
    orderedListBuffer = []
  }

  const flushBlockquote = () => {
    if (!blockquoteBuffer.length) return

    const merged = blockquoteBuffer.join(" ").trim()
    const calloutMatch = merged.match(/^\[!(TIP|WARNING|CALLOUT|NOTE)\]\s*(.*)$/i)

    if (calloutMatch) {
      const type = calloutMatch[1].toLowerCase()
      const contentText = calloutMatch[2] || ""
      const variant =
        type === "tip" ? "tip" : type === "warning" ? "warning" : "callout"

      blocks.push(
        <BlogCallout key={`callout-${blocks.length}`} variant={variant}>
          {renderInline(contentText)}
        </BlogCallout>,
      )
    } else {
      blocks.push(
        <blockquote
          key={`blockquote-${blocks.length}`}
          className="my-6 border-l-4 border-lime-300/60 bg-lime-300/10 px-4 py-3 text-lime-50"
        >
          {renderInline(merged)}
        </blockquote>,
      )
    }

    blockquoteBuffer = []
  }

  const flushAll = () => {
    flushParagraph()
    flushUnorderedList()
    flushOrderedList()
    flushBlockquote()
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      flushAll()
      continue
    }

    if (!skippedFirstTitle && line.startsWith("# ")) {
      skippedFirstTitle = true
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
          className="mt-8 mb-3 text-xl font-semibold text-lime-100"
        >
          {renderInline(line.slice(4).trim())}
        </h3>,
      )
      continue
    }

    if (line.startsWith("## ")) {
      flushAll()
      const headingText = line.slice(3).trim()
      const isNumberedSubheading = /^\d+\.\s/.test(headingText)
      const tocItem = tocItems[tocIndex]
      const expectedLevel: 2 | 3 = isNumberedSubheading ? 3 : 2
      if (tocItem?.level === expectedLevel) tocIndex += 1

      if (isNumberedSubheading) {
        blocks.push(
          <h3
            id={tocItem?.level === 3 ? tocItem.id : undefined}
            key={`h2as3-${blocks.length}`}
            className="mt-8 mb-3 text-xl font-semibold text-lime-100"
          >
            {renderInline(headingText)}
          </h3>,
        )
      } else {
        blocks.push(
          <h2
            id={tocItem?.level === 2 ? tocItem.id : undefined}
            key={`h2-${blocks.length}`}
            className="mt-12 mb-4 border-t border-lime-300/30 pt-8 text-3xl font-semibold text-lime-200"
          >
            {renderInline(headingText)}
          </h2>,
        )
      }
      continue
    }

    if (line.startsWith("> ")) {
      flushParagraph()
      flushUnorderedList()
      flushOrderedList()
      blockquoteBuffer.push(line.slice(2).trim())
      continue
    }

    if (line.startsWith("- ")) {
      flushParagraph()
      flushOrderedList()
      flushBlockquote()
      unorderedListBuffer.push(line.slice(2).trim())
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      flushParagraph()
      flushUnorderedList()
      flushBlockquote()
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
  const faqItems = getFaqItems(post.slug)

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

        <article className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition hover:text-lime-300">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="transition hover:text-lime-300">Guides</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-neutral-200">{post.title}</li>
            </ol>
          </nav>

          <header className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-7">
            <p className="text-xs uppercase tracking-wider text-lime-300">{post.category}</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
            <p className="mt-4 text-base leading-7 text-neutral-300">{post.description}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium uppercase tracking-wider text-neutral-400">
              <span>Published: {post.publishedAt}</span>
              <span>Updated: {post.publishedAt}</span>
              <span>Reading time: {post.readingTime} min</span>
            </div>
          </header>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_250px]">
            <div className="min-w-0">
              <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-7">
                <div className="prose prose-invert prose-neutral max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-lime-300 prose-a:no-underline hover:prose-a:text-lime-200 prose-strong:text-white">
                  {renderMarkdown(post.content, tocItems)}
                </div>
              </section>

              <FaceDetectorCTA
                title={ctaConfig.title}
                description={ctaConfig.description}
                ctaText={ctaConfig.ctaText}
                href={ctaConfig.href}
              />

              <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-7">
                <h2 className="text-2xl font-semibold text-white">FAQ</h2>
                <Accordion type="single" collapsible className="mt-4 space-y-2">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={item.question} value={`faq-${index}`} className="rounded-xl border border-white/10 px-4">
                      <AccordionTrigger className="text-left text-base text-white hover:text-lime-300 hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-7 text-neutral-300">
                        {renderInline(item.answer)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              {relatedPosts.length > 0 && (
                <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-7">
                  <h2 className="text-2xl font-semibold text-white">Related Posts</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="rounded-xl border border-white/10 bg-black/20 p-4 transition hover:border-lime-300/50 hover:bg-black/30"
                      >
                        <p className="text-xs uppercase tracking-wider text-lime-300">{relatedPost.category}</p>
                        <p className="mt-2 text-base font-semibold text-white">{relatedPost.title}</p>
                        <p className="mt-2 text-sm leading-6 text-neutral-300">{relatedPost.description}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="h-fit rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-lime-300">Table of Contents</h2>
              {tocItems.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {tocItems.map((item) => (
                    <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
                      <Link href={`#${item.id}`} className="text-sm leading-6 text-neutral-200 transition hover:text-lime-300">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-neutral-400">This article has no indexed subheadings.</p>
              )}
            </aside>
          </div>
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
