importScripts("js/cache-polyfill.js");
var CACHE_KEY='beehive_v09';

//This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

//Install stage sets up the offline page in the cahche and opens a new cache
self.addEventListener('install', function(event) {
  event.waitUntil(preLoad());
});

var preLoad = function(){
  console.log('[PWA Builder] Install Event processing');
  return caches.open(CACHE_KEY).then(function(cache) {
    console.log('[PWA Builder] Cached index and offline page during Install');
    return cache.addAll(['/offline.html', '/index.html']);
  });
}

self.addEventListener('fetch', function(event) {
  console.log('The service worker is serving the asset.');
  event.respondWith(checkResponse(event.request).catch(function() {
    return returnFromCache(event.request)}
  ));
  event.waitUntil(addToCache(event.request));
});

var checkResponse = function(request){
  return new Promise(function(fulfill, reject) {
    fetch(request).then(function(response){
      if(response.status !== 404) {
        fulfill(response)
      } else {
        reject()
      }
    }, reject)
  });
};

var addToCache = function(request){
  return caches.open(CACHE_KEY).then(function (cache) {
    return fetch(request).then(function (response) {
      console.log('[PWA Builder] add page to offline'+response.url)
      return cache.put(request, response);
    });
  });
};

var returnFromCache = function(request){
  return caches.open(CACHE_KEY).then(function (cache) {
    return cache.match(request).then(function (matching) {
     if(!matching || matching.status == 404) {
       return cache.match('offline.html')
     } else {
       return matching
     }
    });
  });
};

/*
// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener('fetch', function(evt) {
  const url=new URL(evt.request.url);
  //cache only own domain requests
  if(url.origin!==location.origin || 
    url.href.includes("livereload.js?")) return;
  console.log(url.pathname,"service worker got the request");
  // You can use `respondWith()` to answer ASAP...
  evt.respondWith(fromCache(evt.request.clone()));
  // ...and `waitUntil()` to prevent the worker to be killed until
  // the cache is updated.
  evt.waitUntil(
    update(evt.request)
    // Finally, send a message to the client to inform it about the
    // resource is up to date.
    .then(refresh)
  );
});

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    var url=new URL(request.url);
    console.log(url.pathname,"found a match in cache. returning immediately.");
    return cache.match(request);
  });
}


// Update consists in opening the cache, performing a network request and
// storing the new response data.
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      console.log("response.ok",response);
      if(!response.ok)
        throw Error("ShinyError" + response.statusText);
      return cache.put(request, response.clone()).then(function () {
        console.log(request.url, "updating cache from network");
        return response;
      });
    }).catch(function(err){
      console.log(err);
      throw err;
    });
  });
}

// Sends a message to the clients.
function refresh(response) {
  return self.clients.matchAll().then(function (clients) {
    var url=new URL(response.url);
    console.log(url.pathname, "posting clients for resource update");
    clients.forEach(function (client) {
      // Encode which resource has been updated. By including the
      // [ETag](https://en.wikipedia.org/wiki/HTTP_ETag) the client can
      // check if the content has changed.
      var message = {
        type: 'refresh',
        url: response.url,
        // Notice not all servers return the ETag header. If this is not
        // provided you should use other cache headers or rely on your own
        // means to check if the content has changed.
        eTag: response.headers.get('ETag')
      };
      // Tell the client about the update.
      client.postMessage(JSON.stringify(message));
    });
  });
}
*/
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
