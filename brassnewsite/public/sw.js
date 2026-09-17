const CACHE_NAME = "brass-pwa-v4";

self.addEventListener("install", (event) => {
  // Activate the new service worker immediately.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // We only handle GET requests.
  if (request.method !== "GET") {
    return;
  }

  // Only cache requests belonging to our own application.
  if (url.origin !== self.location.origin) {
    return;
  }

  // API data must always remain live.
  // This prevents stale products, orders, authentication,
  // testimonials, videos, etc. from being served from cache.
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // Browser/dev-server internals should not be cached.
  if (
    url.pathname.startsWith("/_next/webpack-hmr") ||
    url.pathname.includes("__nextjs")
  ) {
    return;
  }

  // ---------------------------------------------------------
  // PAGE NAVIGATION
  // ---------------------------------------------------------
  //
  // Online:
  //   Network → Cache
  //
  // Offline:
  //   Cache → Homepage fallback
  //
  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }

  // ---------------------------------------------------------
  // STATIC ASSETS / IMAGES / CSS / JS
  // ---------------------------------------------------------
  //
  // These are cached after being successfully downloaded.
  // This is what prevents the "HTML but no styling" problem.
  //
  event.respondWith(cacheAssets(request));
});

async function networkFirstPage(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);

    if (response.ok) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    // Try the exact page first.
    const cachedPage = await cache.match(request);

    if (cachedPage) {
      return cachedPage;
    }

    // If the requested page wasn't cached, use the cached homepage.
    const cachedHome = await cache.match("/");

    if (cachedHome) {
      return cachedHome;
    }

    // Only if absolutely nothing has been cached.
    return offlinePage();
  }
}

async function cacheAssets(request) {
  const cache = await caches.open(CACHE_NAME);

  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    // Cache successful same-origin assets.
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

function offlinePage() {
  return new Response(
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#0E4001">
  <title>Brass - Offline</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: #F4F2DD;
      color: #0E4001;
      font-family: Arial, sans-serif;
      text-align: center;
    }

    .container {
      max-width: 420px;
    }

    .mark {
      width: 72px;
      height: 72px;
      margin: 0 auto 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 1px solid #E4E198;
      background: #0E4001;
      color: #E4E198;
      font-family: Georgia, serif;
      font-size: 30px;
      font-style: italic;
    }

    h1 {
      margin: 0;
      font-family: Georgia, serif;
      font-size: 34px;
      font-weight: 400;
      font-style: italic;
    }

    p {
      margin-top: 14px;
      color: rgba(14, 64, 1, 0.65);
      line-height: 1.7;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <main class="container">
    <div class="mark">B</div>
    <h1>You're offline</h1>
    <p>
      Your connection is unavailable right now.
      Previously visited Brass pages will remain available
      when cached.
    </p>
  </main>
</body>
</html>`,
    {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    }
  );
}