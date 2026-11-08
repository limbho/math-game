const CACHE_NAME = 'math-game-network-first-v2'; 
const ASSETS = [
  './', './index.html', './style.css', './script.js', './manifest.json',
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Сразу активируем новый SW
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Стратегия Network First: пытаемся скачать из сети, если не выходит - берем из кэша
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Если скачали успешно, обновляем кэш и отдаем пользователю
        const resClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, resClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
