/**
 * Unified analytics entrypoint.
 * - In dev, logs to console for quick verification.
 * - In browsers with gtag available, forwards the event.
 */
export function track(event: string, params: Record<string, any> = {}) {
  const isBrowser = typeof window !== "undefined";
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    // Keep output small but readable in console for manual QA.
    // eslint-disable-next-line no-console
    console.log("[track]", event, params);
  }

  // Forward to GA4 (or any gtag-compatible provider) if present.
  // @ts-ignore
  if (isBrowser && window.gtag) {
    // @ts-ignore
    window.gtag("event", event, params);
  }
}
