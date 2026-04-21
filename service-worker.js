const CACHE_NAME = "mealprep-v2";

const urlsToCache = [
  "/PROJECT-CHELL/",
  "/PROJECT-CHELL/index.html",
  "/PROJECT-CHELL/manifest.json",
  "/PROJECT-CHELL/icons/logo-192x192.png"
];

// ✅ TAMBAH: Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // ← langsung aktif tanpa nunggu tab lama ditutup
});

// ✅ TAMBAH: Activate — bersihin cache lama otomatis
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim(); // ← langsung kontrol semua tab
});

// ✅ Fetch sudah benar, tidak perlu diubah
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});