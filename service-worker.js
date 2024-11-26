var cacheName = 'petstore-v1';
var cacheFiles = [
    'week4.html',
    'Product.js',
    'petstore.webmanifest',
    'images/yarn.jpg',
    'images/cat-litter.jpg',
    'images/laser-pointer.jpg',
    'images/cat-house.jpg',
    'images/icon-store-512.png'
];

// Install Event: Cache the specified files
self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching app shell');
            return cache.addAll(cacheFiles);
        })
    );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', function(e) {
    console.log('[Service Worker] Activate');
    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(thisCacheName) {
                    if (thisCacheName !== cacheName) {
                        console.log('[Service Worker] Removing old cache:', thisCacheName);
                        return caches.delete(thisCacheName);
                    }
                })
            );
        })
    );
});

// Fetch Event: Serve cached files if available
self.addEventListener('fetch', function(e) {
    console.log('[Service Worker] Fetching:', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
