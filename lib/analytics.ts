export function track(event: string, params: Record<string, any> = {}) {
  // @ts-ignore
  if (typeof window !== "undefined" && window.gtag) {
    // @ts-ignore
    window.gtag("event", event, params);
  }
}
