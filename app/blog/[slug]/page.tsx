import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog-posts"
import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"

export const dynamic = "force-static"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
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
    title: `${post.title} | FaceDetector Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.yourface.online/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="min-h-[100dvh] text-white">
      <SiteHeader />
      <article className="container mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <p className="text-xs uppercase tracking-wider text-lime-300">{post.category}</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-2 text-sm text-neutral-400">Published on {post.publishedAt}</p>

        <div className="mt-8 space-y-4 text-neutral-200">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
      <AppverseFooter showLatestArticles={false} />
    </main>
  )
}
