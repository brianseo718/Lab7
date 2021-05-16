// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = ['https://cse110lab6.herokuapp.com/entries'];

// used code from https://developers.google.com/web/fundamentals/primers/service-workers
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
// used code from https://developers.google.com/web/fundamentals/primers/service-workers#cache_and_return_requests
//   - One for fetch requests
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });

// Used code from https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim
//   - One for activation ( check out MDN's clients.claim() for this step )
self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
  });
