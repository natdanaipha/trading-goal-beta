const CACHE_NAME = "banana-trading-v1"
const urlsToCache = [
  "/",
  "/images/banana-logo.png",
  "/images/usdjpy.png",
  "/images/eurusd.png",
  "/images/usdchf-new.png",
  "/images/eurjpy.png",
]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }
      return fetch(event.request)
    }),
  )
})
