import fs from "node:fs"
import path from "node:path"

export type BlogCategory = "Guide" | "Trends" | "Beauty"

export type BlogPost = {
  slug: string
  title: string
  description: string
  excerpt: string
  category: BlogCategory
  publishedAt: string
  tags: string[]
  readingTime: number
  content: string
  relatedSlugs: string[]
}

const BLOG_FILES = [
  "how-to-tell-your-face-shape-from-a-selfie.md",
  "what-face-shape-do-i-have-a-simple-step-by-step-guide.md",
  "face-shape-types-explained.md",
  "how-to-measure-your-face-shape.md",
  "oval-vs-round-face.md",
  "heart-vs-diamond-face-shape.md",
  "best-glasses-for-your-face-shape.md",
  "best-sunglasses-for-your-face-shape.md",
  "best-hats-for-your-face-shape.md",
  "best-hairstyles-for-round-face-shape.md",
  "best-hairstyles-for-square-face-shape.md",
  "best-hairstyles-for-oval-face-shape.md",
  "best-hairstyles-for-heart-face-shape.md",
  "best-hairstyles-for-diamond-face-shape.md",
  "best-hairstyles-for-oblong-face-shape.md",
  "worst-haircuts-for-oval-faces-male.md",
  "best-beard-styles-for-your-face-shape.md",
  "how-accurate-are-ai-face-shape-detectors.md",
] as const

const RELATED_POSTS: Record<string, string[]> = {
  "how-to-tell-your-face-shape-from-a-selfie": [
    "what-face-shape-do-i-have-a-simple-step-by-step-guide",
    "how-to-measure-your-face-shape",
    "how-accurate-are-ai-face-shape-detectors",
    "best-glasses-for-your-face-shape",
  ],
  "what-face-shape-do-i-have-a-simple-step-by-step-guide": [
    "how-to-tell-your-face-shape-from-a-selfie",
    "how-to-measure-your-face-shape",
    "face-shape-types-explained",
    "oval-vs-round-face",
  ],
  "face-shape-types-explained": [
    "what-face-shape-do-i-have-a-simple-step-by-step-guide",
    "how-to-measure-your-face-shape",
    "oval-vs-round-face",
    "heart-vs-diamond-face-shape",
  ],
  "how-to-measure-your-face-shape": [
    "what-face-shape-do-i-have-a-simple-step-by-step-guide",
    "face-shape-types-explained",
    "oval-vs-round-face",
    "heart-vs-diamond-face-shape",
  ],
  "oval-vs-round-face": [
    "face-shape-types-explained",
    "how-to-measure-your-face-shape",
    "best-hairstyles-for-round-face-shape",
    "best-glasses-for-your-face-shape",
  ],
  "heart-vs-diamond-face-shape": [
    "face-shape-types-explained",
    "best-hairstyles-for-heart-face-shape",
    "best-hairstyles-for-diamond-face-shape",
    "best-glasses-for-your-face-shape",
  ],
  "best-glasses-for-your-face-shape": [
    "face-shape-types-explained",
    "best-sunglasses-for-your-face-shape",
    "best-hats-for-your-face-shape",
    "what-face-shape-do-i-have-a-simple-step-by-step-guide",
  ],
  "best-sunglasses-for-your-face-shape": [
    "best-glasses-for-your-face-shape",
    "best-hats-for-your-face-shape",
    "face-shape-types-explained",
    "what-face-shape-do-i-have-a-simple-step-by-step-guide",
  ],
  "best-hats-for-your-face-shape": [
    "best-sunglasses-for-your-face-shape",
    "best-glasses-for-your-face-shape",
    "face-shape-types-explained",
    "what-face-shape-do-i-have-a-simple-step-by-step-guide",
  ],
  "best-hairstyles-for-round-face-shape": [
    "oval-vs-round-face",
    "best-hairstyles-for-square-face-shape",
    "best-hairstyles-for-oblong-face-shape",
    "best-glasses-for-your-face-shape",
  ],
  "best-hairstyles-for-square-face-shape": [
    "best-hairstyles-for-round-face-shape",
    "best-hairstyles-for-oval-face-shape",
    "best-hairstyles-for-oblong-face-shape",
    "best-glasses-for-your-face-shape",
  ],
  "best-hairstyles-for-oval-face-shape": [
    "best-hairstyles-for-square-face-shape",
    "best-hairstyles-for-heart-face-shape",
    "best-glasses-for-your-face-shape",
    "face-shape-types-explained",
  ],
  "best-hairstyles-for-heart-face-shape": [
    "heart-vs-diamond-face-shape",
    "best-hairstyles-for-diamond-face-shape",
    "best-hairstyles-for-oval-face-shape",
    "best-glasses-for-your-face-shape",
  ],
  "best-hairstyles-for-diamond-face-shape": [
    "heart-vs-diamond-face-shape",
    "best-hairstyles-for-heart-face-shape",
    "best-hairstyles-for-oblong-face-shape",
    "best-glasses-for-your-face-shape",
  ],
  "best-hairstyles-for-oblong-face-shape": [
    "best-hairstyles-for-round-face-shape",
    "best-hairstyles-for-square-face-shape",
    "best-hairstyles-for-diamond-face-shape",
    "face-shape-types-explained",
  ],
  "worst-haircuts-for-oval-faces-male": [
    "best-hairstyles-for-oval-face-shape",
    "best-beard-styles-for-your-face-shape",
    "face-shape-types-explained",
    "how-to-measure-your-face-shape",
  ],
  "best-beard-styles-for-your-face-shape": [
    "face-shape-types-explained",
    "best-glasses-for-your-face-shape",
    "best-hairstyles-for-square-face-shape",
    "what-face-shape-do-i-have-a-simple-step-by-step-guide",
  ],
  "how-accurate-are-ai-face-shape-detectors": [
    "how-to-tell-your-face-shape-from-a-selfie",
    "how-to-measure-your-face-shape",
    "what-face-shape-do-i-have-a-simple-step-by-step-guide",
    "face-shape-types-explained",
  ],
}

type FrontMatter = {
  title?: string
  description?: string
  slug?: string
  date?: string
  tags?: string[]
}

function parseFrontMatter(markdown: string): { frontMatter: FrontMatter; content: string } {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n")
  if (lines[0] !== "---") {
    return { frontMatter: {}, content: markdown.trim() }
  }

  const closingIndex = lines.findIndex((line, index) => index > 0 && line === "---")
  if (closingIndex === -1) {
    return { frontMatter: {}, content: markdown.trim() }
  }

  const frontMatterLines = lines.slice(1, closingIndex)
  const content = lines.slice(closingIndex + 1).join("\n").trim()

  const frontMatter: FrontMatter = {}
  let currentListKey: keyof FrontMatter | null = null

  for (const rawLine of frontMatterLines) {
    const line = rawLine.trim()
    if (!line) continue

    if (line.startsWith("- ") && currentListKey === "tags") {
      const value = line.slice(2).trim()
      if (!frontMatter.tags) frontMatter.tags = []
      frontMatter.tags.push(stripQuotes(value))
      continue
    }

    const separatorIndex = line.indexOf(":")
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex).trim() as keyof FrontMatter
    const value = line.slice(separatorIndex + 1).trim()

    if (value === "") {
      currentListKey = key
      if (key === "tags") frontMatter.tags = []
      continue
    }

    currentListKey = null
    const parsedValue = stripQuotes(value)
    if (key === "tags") {
      frontMatter.tags = [parsedValue]
    } else {
      ;(frontMatter[key] as string | undefined) = parsedValue
    }
  }

  return { frontMatter, content }
}

function stripQuotes(value: string) {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1)
  }
  return value
}

function inferCategory(slug: string): BlogCategory {
  if (slug.startsWith("how-") || slug.startsWith("what-")) return "Guide"
  if (slug.includes("hairstyles") || slug.includes("haircuts") || slug.includes("beard") || slug.includes("glasses")) return "Trends"
  return "Beauty"
}

function estimateReadingTime(content: string) {
  const wordCount = content
    .replace(/[#*_`>-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.ceil(wordCount / 220))
}

function loadBlogPost(fileName: string): BlogPost {
  const filePath = path.join(process.cwd(), "blog", fileName)
  const markdown = fs.readFileSync(filePath, "utf8")
  const { frontMatter, content } = parseFrontMatter(markdown)

  if (!frontMatter.slug || !frontMatter.title || !frontMatter.description || !frontMatter.date) {
    throw new Error(`Missing required front matter in ${fileName}`)
  }

  return {
    slug: frontMatter.slug,
    title: frontMatter.title,
    description: frontMatter.description,
    excerpt: frontMatter.description,
    category: inferCategory(frontMatter.slug),
    publishedAt: frontMatter.date,
    tags: frontMatter.tags ?? [],
    readingTime: estimateReadingTime(content),
    content,
    relatedSlugs: RELATED_POSTS[frontMatter.slug] ?? [],
  }
}

export const BLOG_POSTS: BlogPost[] = BLOG_FILES.map(loadBlogPost).sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
)

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function getRelatedPosts(slug: string) {
  const post = getBlogPostBySlug(slug)
  if (!post) return []

  return post.relatedSlugs
    .map((relatedSlug) => getBlogPostBySlug(relatedSlug))
    .filter((item): item is BlogPost => Boolean(item))
}
