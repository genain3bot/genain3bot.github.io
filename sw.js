importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
);

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

// /*
// Copyright 2015, 2019, 2020, 2021 Google LLC. All Rights Reserved.
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//  http://www.apache.org/licenses/LICENSE-2.0
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
// */

// // Incrementing OFFLINE_VERSION will kick off the install event and force
// // previously cached resources to be updated from the network.
// // This variable is intentionally declared and unused.
// // Add a comment for your linter if you want:
// // eslint-disable-next-line no-unused-vars
// const OFFLINE_VERSION = 1;
// const CACHE_NAME = 'offline';
// // Customize this with a different URL if needed.
// const OFFLINE_URL = 'offline.html';

// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         (async () => {
//             const cache = await caches.open(CACHE_NAME);
//             // Setting {cache: 'reload'} in the new request ensures that the
//             // response isn't fulfilled from the HTTP cache; i.e., it will be
//             // from the network.
//             await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
//         })()
//     );
//     // Force the waiting service worker to become the active service worker.
//     self.skipWaiting();
// });

// self.addEventListener('activate', (event) => {
//     event.waitUntil(
//         (async () => {
//             // Enable navigation preload if it's supported.
//             // See https://developers.google.com/web/updates/2017/02/navigation-preload
//             if ('navigationPreload' in self.registration) {
//                 await self.registration.navigationPreload.enable();
//             }
//         })()
//     );

//     // Tell the active service worker to take control of the page immediately.
//     self.clients.claim();
// });

// self.addEventListener('fetch', (event) => {
//     // Only call event.respondWith() if this is a navigation request
//     // for an HTML page.
//     if (event.request.mode === 'navigate') {
//         event.respondWith(
//             (async () => {
//                 try {
//                     // First, try to use the navigation preload response if it's
//                     // supported.
//                     const preloadResponse = await event.preloadResponse;
//                     if (preloadResponse) {
//                         return preloadResponse;
//                     }

//                     // Always try the network first.
//                     const networkResponse = await fetch(event.request);
//                     return networkResponse;
//                 } catch (error) {
//                     // catch is only triggered if an exception is thrown, which is
//                     // likely due to a network error.
//                     // If fetch() returns a valid HTTP response with a response code in
//                     // the 4xx or 5xx range, the catch() will NOT be called.
//                     console.log(
//                         'Fetch failed; returning offline page instead.',
//                         error
//                     );

//                     const cache = await caches.open(CACHE_NAME);
//                     const cachedResponse = await cache.match(OFFLINE_URL);
//                     return cachedResponse;
//                 }
//             })()
//         );
//     }

//     // If our if() condition is false, then this fetch handler won't
//     // intercept the request. If there are any other fetch handlers
//     // registered, they will get a chance to call event.respondWith().
//     // If no fetch handlers call event.respondWith(), the request
//     // will be handled by the browser as if there were no service
//     // worker involvement.
// });

// const cacheName = 'cache1'; // Change value to force update

// self.addEventListener('install', (event) => {
//     // Kick out the old service worker
//     self.skipWaiting();

//     event.waitUntil(
//         caches.open(cacheName).then((cache) => {
//             return cache.addAll([
//                 '/',
//                 'favicon.ico', // Favicon, IE and fallback for other browsers
//                 'favicon.svg', // Favicon, default
//                 'favicon-32x32.png', // Favicon, Safari on Mac OS
//                 'index.html', // Main HTML file
//                 'offline.html', // Offline HTML file
//                 'logo.png', // Logo
//                 'main.js', // Main Javascript file
//                 'manifest.json', // Manifest file
//                 'apple-touch-icon.png', // Apple touch icon
//                 'apple-icon-180.png', // Apple touch icon
//                 'apple-splash-2048-2732.jpg', // Apple splash screen
//                 'apple-splash-1668-2224.jpg', // Apple splash screen
//                 'apple-splash-1536-2048.jpg', // Apple splash screen
//                 'apple-splash-1668-2388.jpg', // Apple splash screen
//                 'apple-splash-1620-2160.jpg', // Apple splash screen
//                 'apple-splash-1284-2778.jpg', // Apple splash screen
//                 'apple-splash-1170-2532.jpg', // Apple splash screen
//                 'apple-splash-1125-2436.jpg', // Apple splash screen
//                 'apple-splash-1242-2688.jpg', // Apple splash screen
//                 'apple-splash-828-1792.jpg', // Apple splash screen
//                 'apple-splash-1242-2208.jpg', // Apple splash screen
//                 'apple-splash-750-1334.jpg', // Apple splash screen
//                 'apple-splash-640-1136.jpg', // Apple splash screen
//                 'apple-splash-2048-1536.jpg', // Apple splash screen
//                 'apple-splash-2224-1668.jpg', // Apple splash screen
//                 'manifest-icon-192.maskable.png',
//                 'web-app-manifest-192x192.png',
//                 'web-app-manifest-512x512.png',
//                 'manifest-icon-512.maskable.png',
//                 'share.jpg', // Social media sharing
//                 'style.css' // Main CSS file
//             ]);
//         })
//     );
// });

// self.addEventListener('activate', (event) => {
//     // Delete any non-current cache
//     event.waitUntil(
//         caches.keys().then((keys) => {
//             Promise.all(
//                 keys.map((key) => {
//                     if (![cacheName].includes(key)) {
//                         return caches.delete(key);
//                     }
//                 })
//             );
//         })
//     );
// });

// // Offline-first, cache-first strategy
// // Kick off two asynchronous requests, one to the cache and one to the network
// // If there's a cached version available, use it, but fetch an update for next time.
// // Gets data on screen as quickly as possible, then updates once the network has returned the latest data.
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.open(cacheName).then((cache) => {
//             return cache.match(event.request).then((response) => {
//                 return (
//                     response ||
//                     fetch(event.request).then((networkResponse) => {
//                         cache.put(event.request, networkResponse.clone());
//                         return networkResponse;
//                     })
//                 );
//             });
//         })
//     );
// });
