import type { ReactNode } from "react"

type BlogCalloutVariant = "callout" | "tip" | "warning"

const variantStyles: Record<BlogCalloutVariant, string> = {
  callout: "border-lime-300/45 bg-lime-300/10 text-neutral-100",
  tip: "border-emerald-300/45 bg-emerald-300/10 text-neutral-100",
  warning: "border-amber-300/55 bg-amber-300/10 text-neutral-100",
}

const variantLabel: Record<BlogCalloutVariant, string> = {
  callout: "Callout",
  tip: "Tip",
  warning: "Warning",
}

export function BlogCallout({
  variant,
  children,
}: {
  variant: BlogCalloutVariant
  children: ReactNode
}) {
  return (
    <aside className={`my-6 rounded-xl border px-4 py-3 ${variantStyles[variant]}`}>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-white/80">{variantLabel[variant]}</p>
      <div className="text-sm leading-7">{children}</div>
    </aside>
  )
}
