/**
 * Ghost Service Worker — Offline App Shell Cache
 * Version: 2.0.0
 *
 * Caches the app shell (index.html + CDN assets) so Ghost works offline.
 * No message data is ever cached — messages exist only in RAM.
 */

const CACHE_NAME = 'ghost-v2.0.0';

// App shell files to cache on install
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

// CDN resources to cache (React, Tailwind, Babel, JetBrains Mono)
const CDN_RESOURCES = [
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.tailwindcss.com',
];

// ─── Install: cache app shell ─────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Cache local app shell files
      await cache.addAll(APP_SHELL);

      // Cache CDN resources (best-effort — don't fail install if CDN is down)
      await Promise.allSettled(
        CDN_RESOURCES.map(url =>
          fetch(url, { mode: 'cors' })
            .then(res => res.ok ? cache.put(url, res) : null)
            .catch(() => null)
        )
      );

      console.log('[Ghost SW] App shell cached');
    })
  );
  self.skipWaiting();
});

// ─── Activate: clean old caches ───────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[Ghost SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    )
  );
  self.clients.claim();
});

// ─── Fetch: cache-first for app shell, network-first for everything else ──────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Never cache POST requests or non-GET
  if (request.method !== 'GET') return;

  // Never cache Bluetooth or crypto operations (they're in-memory anyway)
  if (url.protocol === 'bluetooth:') return;

  // Cache-first strategy for app shell and CDN assets
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      // Network fallback
      return fetch(request).then(response => {
        // Only cache successful responses for our origin or known CDNs
        if (
          response.ok &&
          (url.origin === self.location.origin ||
           url.hostname.includes('unpkg.com') ||
           url.hostname.includes('fonts.googleapis.com') ||
           url.hostname.includes('fonts.gstatic.com') ||
           url.hostname.includes('cdn.tailwindcss.com'))
        ) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
        }
        return response;
      }).catch(() => {
        // Offline fallback: return cached index.html for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});

// ─── Message: handle skip-waiting from app ────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
