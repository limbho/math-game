const CACHE_NAME = 'math-game-network-first-v8'; // Поменяли версию кэша
const ASSETS = [
  './', './index.html', './style.css', './script.js', './manifest.json',
];

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Если запрос идет к внешнему сайту (например, на шрифты Google),
  // пропускаем его напрямую в сеть, не трогая кэш.
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Для своих файлов используем Network First
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const resClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, resClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
