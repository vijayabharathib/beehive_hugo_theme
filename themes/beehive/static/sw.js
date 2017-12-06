importScripts("js/cache-polyfill.js");
var CACHE_KEY='beehive_v02';
var urls_to_cache=[
  "/js/cache-polyfill.js",
  "/css/main.css",
  "/",
  "/page/privacy/",
  "/author/vijayabharathib/"
];
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE_KEY).then(function(cache) {
      return cache.addAll(urls_to_cache);
    },function(err){
      console.log(err);
    })
  );
});
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", function(event) {

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_KEY!==cacheName) {
            console.log("Clearing old cache",cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});