importScripts("js/cache-polyfill.js");
var CACHE_KEY='beehive_v17';
let files_to_preload=[
  '/',
  '/offline/',
  'img/site_logo.svg',
  'css/main.css'];

self.addEventListener('install', function(event) {
  event.waitUntil(preLoad());
});

var preLoad = function(){
  return caches.open(CACHE_KEY).then(cache => {
    return cache.addAll(files_to_preload);
  });
}

self.addEventListener('fetch', function(event) {
  event.respondWith(returnFromCache(event.request.clone()));
});

var returnFromCache = function(request){
  let url=new URL(request.url);
  return caches.open(CACHE_KEY).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if(!matching || matching.status == 404) {
        throw Error("no-cache-match");
      } else {
        return matching
      }
    })
  }).catch(err=>{
    return fromNetwork(request);
  });
};

var offlineContent= function(request){
  return caches.open(CACHE_KEY).then(function (cache) {
        return cache.match('offline/')
  });
};

var fromNetwork = function(request){
  let url=new URL(request.url);
  return fetch(request.clone()).then(function (response) {
      const chain = Promise.resolve(response.clone());
      caches.open(CACHE_KEY).then(function (cache) {
        cache.put(request, response.clone());
      });
      return chain;
    }).catch(err=>{
      return offlineContent(request);
    });
};


self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_KEY!==cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
