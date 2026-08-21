// SUAS QRF Service Worker — network-first with offline fallback
const CACHE = 'suas-qrf-v1';

const SHELL = [
  './',
  './about/',
  './how-it-works/',
  './veterans/',
  './families/',
  './pilot/',
  './counties/',
  './nonprofits/',
  './contact/',
  './donate/',
  './safety/',
  './app/',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const clone = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || Response.error()))
  );
});
