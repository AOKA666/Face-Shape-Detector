const URLS = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/about", priority: "0.7", changefreq: "monthly" },
  { url: "/Blog", priority: "0.6", changefreq: "monthly" },
  { url: "/face-shape-detector-online", priority: "0.9", changefreq: "weekly" },
  { url: "/face-shape-detector-for-men", priority: "0.9", changefreq: "weekly" },
  { url: "/face-shape-detector-for-women", priority: "0.9", changefreq: "weekly" },
  { url: "/face-shape-detector-from-photo", priority: "0.9", changefreq: "weekly" },
  { url: "/what-face-shape-do-i-have", priority: "0.8", changefreq: "weekly" },
]

export async function GET(request: Request) {
  const { origin } = new URL(request.url)
  const lastmod = new Date().toISOString()

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${URLS.map(
  ({ url, priority, changefreq }) => `  <url>
    <loc>${origin}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
).join("\n")}
</urlset>`

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
