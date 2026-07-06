/* Snaplink service worker.
 *
 * Strategy: network-first for page navigations (analytics data must be
 * fresh) with a designed offline fallback; cache-first for hashed static
 * assets (safe forever — the hash changes when content does). Redirect hits
 * (/:slug) must NEVER be intercepted: a cached redirect would silently stop
 * counting clicks, which is the whole product.
 */
const VERSION = "snaplink-v1";
const SHELL = ["/offline", "/icon-192.png", "/icon-512.png", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Hashed build assets: cache-first.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ??
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(VERSION).then((cache) => cache.put(req, copy));
            return res;
          }),
      ),
    );
    return;
  }

  // App pages: network-first, offline fallback. Only the known app routes —
  // anything else (e.g. /:slug redirects) goes straight to the network.
  const isAppPage =
    url.pathname === "/" || url.pathname === "/offline" || url.pathname.startsWith("/dashboard");
  if (req.mode === "navigate" && isAppPage) {
    event.respondWith(fetch(req).catch(() => caches.match("/offline")));
  }
});
