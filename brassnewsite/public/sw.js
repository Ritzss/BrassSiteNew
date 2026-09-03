const CACHE_VERSION = "brass-pwa-v2";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const PAGE_CACHE = `${CACHE_VERSION}-pages`;

// Keep this intentionally small.
// We do not cache API responses, checkout, payments, or auth data.
const APP_SHELL = ["/"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => !key.startsWith(CACHE_VERSION))
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Only cache normal GET requests.
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Never cache API requests.
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // Never interfere with Next.js internal requests.
  if (url.pathname.startsWith("/_next/")) {
    return;
  }

  // External requests such as YouTube should remain network-only.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Images use cache-first because they rarely need to change
  // during the same browsing session.
  if (
    request.destination === "image" ||
    /\.(png|jpg|jpeg|webp|avif|gif|svg)$/i.test(url.pathname)
  ) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // HTML/navigation requests use network-first.
  // This keeps the storefront fresh when online while still
  // allowing previously visited pages to work offline.
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, PAGE_CACHE));
    return;
  }

  // Everything else uses network-first.
  event.respondWith(networkFirst(request, STATIC_CACHE));
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    if (response.ok) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    return new Response("", {
      status: 503,
      statusText: "Offline",
    });
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);

    if (response.ok) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    // For a completely new offline navigation, fall back
    // to the cached homepage.
    if (request.mode === "navigate") {
      const home = await caches.match("/");
      if (home) {
        return home;
      }
    }

    return new Response(
      `
        <!doctype html>
        <html>
          <body style="font-family: sans-serif; padding: 40px;">
            <h1>You're offline</h1>
            <p>Please reconnect to continue shopping.</p>
          </body>
        </html>
      `,
      {
        status: 503,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  }
}