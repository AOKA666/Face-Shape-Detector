export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: "Guide" | "Trends" | "Beauty"
  publishedAt: string
  content: string[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-determine-your-face-shape",
    title: "How to Determine Your Face Shape: A Complete Guide",
    excerpt: "Learn the step-by-step process to identify your face shape and why it matters for your style.",
    category: "Guide",
    publishedAt: "2026-03-01",
    content: [
      "Start with a straight-on photo in natural light and tie your hair back so your forehead, cheekbones, and jawline are visible.",
      "Compare your forehead width, cheekbone width, and jaw width, then look at your overall face length. These four dimensions are enough to classify most face shapes.",
      "Use style decisions as the final check: if your best haircuts and glasses all match one shape category, you likely found the right fit.",
    ],
  },
  {
    slug: "best-hairstyles-for-every-face-shape-2025",
    title: "Best Hairstyles for Every Face Shape in 2025",
    excerpt: "Discover trending hairstyles that perfectly complement your unique face shape.",
    category: "Trends",
    publishedAt: "2026-02-24",
    content: [
      "Oval faces usually work with most cuts, but layered mid-length styles remain the safest all-round option.",
      "Round faces benefit from height and structure, while square faces look balanced with soft texture around the temples and jaw.",
      "Heart and diamond face shapes are easiest to style with volume near the jawline to rebalance proportions.",
    ],
  },
  {
    slug: "makeup-tips-based-on-your-face-shape",
    title: "Makeup Tips Based on Your Face Shape",
    excerpt: "Expert contouring and highlighting techniques to enhance your natural features.",
    category: "Beauty",
    publishedAt: "2026-02-10",
    content: [
      "Contour should shape, not shrink. Place shadow only where you want visual depth and keep blending soft.",
      "For round and square faces, subtle lift at the temples and under cheekbones adds structure.",
      "For oblong faces, horizontal blush placement can restore width and create better balance.",
    ],
  },
]

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug)
}
