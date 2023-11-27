// Names of the two caches used in this version of the service worker.
// Change the cache name any time any of the cached files change.
const CACHE_NAME = "static-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

// Array of URLs to cache.
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  // URLs for your JavaScript bundles (check these in your 'dist' folder after build)
  "/js/app.aa664c7.js", // Your main app bundle with hash
  "/js/chunk-vendors.351b46c9.js", // Your vendor bundle with hash
  "/css/app.3d90179c.css",
  // Add URLs for other resources you want to cache (CSS, images, etc.)
  // e.g., '/css/main.css', '/img/logo.png'
];

// Install event: The browser triggers this event when it installs the service worker.
// You can use this event to prepare the service worker to be used, e.g., by creating a cache.
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event: Fired when the service worker starts up.
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Fired when the web page requests a resource.
// Here you can control how the service worker responds to these requests.
self.addEventListener("fetch", (event) => {
  // Cache-First Strategy for static assets
  if (event.request.url.includes("/")) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          return response || fetch(event.request);
        });
      })
    );
  }
});
