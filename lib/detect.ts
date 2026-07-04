import { NextRequest } from "next/server";

/** Rough device class from the User-Agent string. */
export function deviceFromUA(ua: string): string {
  const s = ua.toLowerCase();
  if (/bot|crawl|spider|slurp|bingpreview/.test(s)) return "Bot";
  if (/ipad|tablet|kindle|playbook|silk/.test(s)) return "Tablet";
  if (/mobi|iphone|android.*mobile|phone/.test(s)) return "Mobile";
  return "Desktop";
}

/** Best-effort country from edge/CDN headers (Vercel sets x-vercel-ip-country). */
export function countryFromHeaders(req: NextRequest): string {
  const c =
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    req.headers.get("x-country");
  if (!c || c === "XX") return "Unknown";
  return c.toUpperCase();
}

/** Referrer host only (keeps analytics clean), or "Direct". */
export function referrerHost(referer: string | null): string {
  if (!referer) return "Direct";
  try {
    return new URL(referer).hostname.replace(/^www\./, "");
  } catch {
    return "Direct";
  }
}
