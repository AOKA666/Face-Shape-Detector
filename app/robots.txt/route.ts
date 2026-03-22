export async function GET(request: Request) {
  const { origin } = new URL(request.url)

  const lines = [
    "# robots.txt",
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /admin/",
    "Disallow: /private/",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
  ].join("\n")

  return new Response(lines, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
