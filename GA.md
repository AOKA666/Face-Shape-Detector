## 2）如何接入 GA4（最简单、最稳）

> 适合你现在：免费、够用、和 Google Search Console 配合做 SEO 很方便。

### 步骤

1. 去 GA4 创建 Property，拿到 `G-XXXXXXXXXX`
2. Next.js 里加环境变量：

- `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

### 在 Next.js（App Router）里接入

在 `app/layout.tsx` 里（或你全局 layout）加：

```
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 关键：埋 3 个事件（你现在最需要的）

你要追的不是 pageview，而是漏斗：

- `upload_start`
- `result_view`
- `cta_click`

在任意组件里触发：

```
export function track(event: string, params: Record<string, any> = {}) {
  // @ts-ignore
  if (typeof window !== "undefined" && window.gtag) {
    // @ts-ignore
    window.gtag("event", event, params);
  }
}
```

使用：

```
track("upload_start", { site: "yourface" });
track("result_view", { site: "yourface" });
track("cta_click", { site: "yourface", cta: "email_waitlist" });
```