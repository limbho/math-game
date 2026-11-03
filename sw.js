const CACHE_NAME = 'math-game-v6'; // <-- МЕНЯЙ ЭТУ ЦИФРУ КАЖДЫЙ РАЗ, КОГДА МЕНЯЕШЬ КОД
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()) // Принудительно активируем новый SW
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim()) // Захватываем контроль над страницей
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
