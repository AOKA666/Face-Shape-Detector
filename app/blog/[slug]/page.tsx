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
  "how-to-measure-your-face-shape": {
    href: "/what-face-shape-do-i-have",
    ctaText: "Measure and Confirm Your Face Shape",
    title: "Need a More Accurate Face Shape Check?",
    description: "Use our guided face shape page and AI support to validate your proportions before making styling decisions.",
  },
  "oval-vs-round-face": {
    href: "/face-shape-detector-from-photo",
    ctaText: "Check Oval vs Round With a Photo",
    title: "Still Stuck Between Oval and Round?",
    description: "Upload a clear front-facing image and compare your proportions with AI-assisted analysis.",
  },
  "heart-vs-diamond-face-shape": {
    href: "/face-shape-detector-online",
    ctaText: "Compare Your Face Shape Online",
    title: "Need Help Separating Heart From Diamond?",
    description: "Use our face shape detector to validate where your face is widest before choosing styles.",
  },
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
  "best-hairstyles-for-heart-face-shape": {
    href: "/face-shape-detector-for-women",
    ctaText: "Try the Face Shape Detector for Women",
    title: "Confirm Heart Face Shape Before Your Next Cut",
    description: "Use a clear photo to validate heart-shaped proportions before choosing bangs, bobs, or layered styles.",
  },
  "best-hairstyles-for-diamond-face-shape": {
    href: "/face-shape-detector-for-women",
    ctaText: "Check Diamond Face Shape Online",
    title: "Validate Diamond Face Shape First",
    description: "Confirm whether your cheekbones are the widest point before choosing a cut designed for diamond faces.",
  },
  "best-hairstyles-for-oblong-face-shape": {
    href: "/face-shape-detector-for-men",
    ctaText: "Try the Face Shape Detector",
    title: "Check If Your Face Is Oblong or Oval",
    description: "Use our detector to compare face length and width before choosing a style that adds more balance.",
  },
  "best-haircuts-for-oval-face-male": {
    href: "/mens-hairstyles-by-face-shape",
    ctaText: "Browse Men's Haircuts by Face Shape",
    title: "Need More Men's Haircut Options?",
    description: "Use the male haircut hub to compare oval, oblong, round, square, heart, and diamond face strategies in one place.",
  },
  "worst-haircuts-for-oval-faces-male": {
    href: "/face-shape-detector-for-men",
    ctaText: "Check Your Face Shape Before Your Next Cut",
    title: "Make Sure Your Face Is Actually Oval",
    description: "Use a clear photo to confirm whether your face is oval, oblong, or somewhere in between before copying the wrong haircut.",
  },
  "best-haircuts-for-oblong-face-male": {
    href: "/mens-hairstyles-by-face-shape",
    ctaText: "Compare Men's Haircuts by Face Shape",
    title: "Need More Long-Face Haircut Direction?",
    description: "Use the male haircut hub to compare oblong, oval, round, square, heart, and diamond haircut strategy side by side.",
  },
  "worst-haircuts-for-long-face-men": {
    href: "/face-shape-detector-for-men",
    ctaText: "Check If Your Face Is Oblong or Oval",
    title: "Confirm Your Face Shape Before the Barber Does Damage",
    description: "Use a clear photo to verify whether your face is long, oblong, or oval before choosing a height-heavy style that works against you.",
  },
  "best-beard-styles-for-oval-face-male": {
    href: "/beard-styles-by-face-shape",
    ctaText: "Browse Beard Styles by Face Shape",
    title: "Need More Beard Ideas by Face Shape?",
    description: "Use the beard hub to compare how different beard shapes affect oval, oblong, round, square, heart, and diamond faces.",
  },
  "oval-vs-oblong-face-male": {
    href: "/face-shape-detector-for-men",
    ctaText: "Compare Your Face Shape Online",
    title: "Still Stuck Between Oval and Oblong?",
    description: "Upload a clear photo and compare your proportions before choosing a haircut meant for the wrong face shape.",
  },
  "best-beard-styles-for-your-face-shape": {
    href: "/face-shape-detector-for-men",
    ctaText: "Try the Face Shape Detector for Men",
    title: "Get Beard Suggestions Based on Your Face Shape",
    description: "Identify your face shape first, then pick beard styles that add balance instead of bulk.",
  },
  "best-sunglasses-for-your-face-shape": {
    href: "/face-shape-detector-online",
    ctaText: "Find Your Face Shape Before Choosing Sunglasses",
    title: "Start With Your Face Shape",
    description: "Use our detector to identify your proportions before buying sunglasses that work against your features.",
  },
  "best-hats-for-your-face-shape": {
    href: "/face-shape-detector-from-photo",
    ctaText: "Check Your Face Shape From a Photo",
    title: "Choose Hat Shapes With Better Proportion",
    description: "Run a quick face shape check before picking brim width, crown height, and hat structure.",
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
  "how-to-measure-your-face-shape": [
    {
      question: "Do I need exact measurements to identify my face shape?",
      answer:
        "No. You need relative comparison more than perfect precision. Look for which areas are widest and whether the face is longer than it is wide.",
    },
    {
      question: "Can I measure my face shape from a photo instead of a tape measure?",
      answer:
        "Yes. A clear front-facing photo can work well, especially if you compare it with our [face shape detector from photo](/face-shape-detector-from-photo).",
    },
  ],
  "oval-vs-round-face": [
    {
      question: "What is the biggest difference between oval and round face shape?",
      answer:
        "Oval faces are longer than they are wide, while round faces have width and length that are much closer.",
    },
    {
      question: "How can I check whether I am oval or round?",
      answer:
        "Compare face length with cheekbone width, then confirm with [what face shape do I have](/what-face-shape-do-i-have) or [face shape detector online](/face-shape-detector-online).",
    },
  ],
  "heart-vs-diamond-face-shape": [
    {
      question: "What is the easiest way to separate heart and diamond face shape?",
      answer:
        "Check the widest point. If the forehead is widest, heart is more likely. If the cheekbones are widest, diamond is more likely.",
    },
    {
      question: "Can hairstyles help distinguish heart and diamond face shapes?",
      answer:
        "Yes, but do not rely on styling alone. Use your proportions first, then compare with [face shape types explained](/blog/face-shape-types-explained).",
    },
  ],
  "worst-haircuts-for-oval-faces-male": [
    {
      question: "Can men with oval faces still wear a pompadour or slick back?",
      answer:
        "Yes, but keep the height controlled. The problem is usually too much volume on top combined with sides that are too tight.",
    },
    {
      question: "What haircut is usually safest for oval face shape male?",
      answer:
        "A textured crop, side part, taper fade, or low-volume quiff is usually safer because it preserves balance instead of exaggerating face length.",
    },
  ],
  "best-haircuts-for-oval-face-male": [
    {
      question: "What is the best haircut for oval face male?",
      answer:
        "A textured crop, Ivy League, side part, or low quiff is usually a strong option because it keeps the face balanced instead of too long.",
    },
    {
      question: "Should oval face men avoid fades?",
      answer:
        "Not all fades. Low fades and tapers usually work better than very high skin fades, which can remove too much side width and make the face look longer.",
    },
  ],
  "best-haircuts-for-oblong-face-male": [
    {
      question: "What haircut makes an oblong face look shorter?",
      answer:
        "Textured fringe, French crop, and controlled crew cuts usually help because they reduce vertical emphasis and keep more balance through the sides.",
    },
    {
      question: "Should oblong face men avoid height on top?",
      answer:
        "Usually yes. Too much height on top often makes an oblong face look longer, especially when paired with tight sides.",
    },
  ],
  "worst-haircuts-for-long-face-men": [
    {
      question: "Why are high fades bad for long face men?",
      answer:
        "Because they remove side width and usually get paired with more height on top, which exaggerates face length instead of balancing it.",
    },
    {
      question: "Can long face men still wear short hair?",
      answer:
        "Yes. The issue is not short hair itself. The problem is short haircuts that are too tall, too tight, or too narrow overall.",
    },
  ],
  "best-beard-styles-for-oval-face-male": [
    {
      question: "What beard style suits an oval face male best?",
      answer:
        "Heavy stubble, a short boxed beard, or a controlled full beard usually works best because these styles add structure without making the face look too long.",
    },
    {
      question: "Should oval face men avoid long beards?",
      answer:
        "Usually yes if the beard gets very pointed or chin-heavy. Oval faces do not usually need extra vertical length through the lower face.",
    },
  ],
  "oval-vs-oblong-face-male": [
    {
      question: "What is the biggest difference between oval and oblong face male?",
      answer:
        "Both are longer than they are wide, but oblong faces are noticeably longer and usually need less height on top and more balance through the sides.",
    },
    {
      question: "Why does oval vs oblong matter for haircuts?",
      answer:
        "Because a haircut that works on an oval face can easily over-elongate an oblong face. That difference changes what volume, fringe, and fade level make sense.",
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
    openGraph: {
      type: "article",
      url: `https://www.yourface.online/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
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
    "@id": `https://www.yourface.online/blog/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    keywords: post.tags.join(", "),
    articleSection: post.category,
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

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1"),
      },
    })),
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
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <Script
        id={`blog-faq-schema-${post.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </>
  )
}
