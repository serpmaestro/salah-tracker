// ─────────────────────────────────────────────────────────────
//  Qaza Tracker — Service Worker
//  Strategy:
//    • index.html  → NETWORK-FIRST (always get latest app code)
//    • assets      → CACHE-FIRST   (icons, fonts — fast offline)
//    • User data   → localStorage  (NEVER touched by SW — always safe)
//
//  HOW TO FORCE UPDATE ON EVERY UPLOAD:
//  Just change the BUILD_DATE string below to today's date/time.
//  This changes the cache name → old cache deleted → fresh files loaded.
//  User prayer data, adjustments, counts are in localStorage — untouched.
// ─────────────────────────────────────────────────────────────

const BUILD_DATE  = '2026-02-19-v2';          // ← change this on every upload
const CACHE_NAME  = `qaza-tracker-${BUILD_DATE}`;

const STATIC_ASSETS = [
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// ── Install: pre-cache static assets only (NOT index.html) ──────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())   // activate immediately, don't wait
  );
});

// ── Activate: delete ALL old caches ─────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)  // keep only current cache
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      ))
      .then(() => self.clients.claim())       // take control immediately
  );
});

// ── Fetch strategy ───────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isHTML = event.request.mode === 'navigate' ||
                 url.pathname.endsWith('.html') ||
                 url.pathname.endsWith('/');

  if (isHTML) {
    // ── NETWORK-FIRST for HTML: always get latest app code ──────────────────
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(cached => cached || caches.match('./index.html'));
        })
    );

  } else {
    // ── CACHE-FIRST for assets: fast, offline-friendly ──────────────────────
    event.respondWith(
      caches.match(event.request)
        .then(cached => {
          if (cached) return cached;
          return fetch(event.request)
            .then(response => {
              if (response.ok && (response.type === 'basic' || response.type === 'cors')) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
              }
              return response;
            })
            .catch(() => {});
        })
    );
  }
});

// ── Listen for manual skipWaiting message ───────────────────────────────────
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
