import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { Suspense } from "react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { BackToTopControl } from "@/components/back-to-top-control"
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "AI Face Shape Detector \u2013 Free Online Tool",
  description:
    "Upload your photo to instantly detect your face shape using AI. Get personalized hairstyle, makeup, and styling recommendations based on your unique face shape.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Font Preload */}
        <link
          rel="preload"
          href="/fonts/Inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />

        <Script id="dynamic-favicon" strategy="beforeInteractive">
          {`
            function updateFavicon() {
              const faviconHref = '/favicon.ico';
              let link = document.querySelector("link[rel~='icon']");
              if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
              }
              link.href = faviconHref;
            }
            updateFavicon();
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PQH3TFZL');`}
        </Script>
        {/* End Google Tag Manager */}

        {/* Ahrefs Analytics */}
        <Script src="https://analytics.ahrefs.com/analytics.js" data-key="cQRMVPCUPVxrqZP+upBo4w" strategy="lazyOnload" />

        {/* Google Analytics (deferred) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="lazyOnload" />
            <Script id="gtag-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PQH3TFZL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Suspense fallback={null}>
          <div className="fixed inset-0 z-0 bg-black overflow-hidden">
            <div className="absolute inset-0 opacity-70 blur-3xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#4c1d95_0,#0b0b0f_35%),radial-gradient(circle_at_80%_0%,#312e81_0,#0b0b0f_30%),radial-gradient(circle_at_50%_80%,#0f172a_0,#0b0b0f_28%)]" />
            </div>
          </div>
          <div className="relative z-10">{children}</div>
          <ScrollProgressIndicator />
          <BackToTopControl />
        </Suspense>

        {/* Vercel Speed Insights and Analytics components */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
