const version = "0.1.1";
const cacheName = `currency-convertor-${version}`;
self.addEventListener('install', event => {
  const timeStamp = Date.now();
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/css/mydev.css`,
        `/js/currencyconvertor.js`,
        `https://free.currencyconverterapi.com/api/v5/currencies`,
        `css/bootstrap.min.css`,
        `css/font-awesome/css/font-awesome.min.css`,
        `js/idb.js`,
        `/imgs/bg_images.jpg`,
        `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css`,
        `https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js`,
        `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js`
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});