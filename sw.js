/* Offline-first service worker: precache the whole guide, serve from cache,
   update cache in the background. Bump CACHE_VERSION whenever files change. */
const CACHE_VERSION = "umrah-v2";
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/base.css",
  "./css/layout.css",
  "./css/print.css",
  "./js/data/steps.js",
  "./js/i18n.js",
  "./js/illustrations.js",
  "./js/app.js",
  "./js/sw-register.js",
  "./fonts/Amiri-Regular.ttf",
  "./fonts/Amiri-Bold.ttf",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      const network = fetch(event.request)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
          }
          return res;
        })
        .catch(() => cached || caches.match("./index.html"));
      return cached || network;
    })
  );
});
