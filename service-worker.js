const CACHE_NAME = "mealprep-v1";
// Hanya masukkan file yang PASTI ada di repo Anda
const urlsToCache = [
  "/PROJECT-CHELL/",
  "/PROJECT-CHELL/index.html",
  "/PROJECT-CHELL/manifest.json",
  "/PROJECT-CHELL/icons/logo-192x192.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});