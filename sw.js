// Cache name is app-specific on purpose. The activate handler deletes every cache
// whose name differs, so renaming this is what evicts a previous app's shell if one
// was ever served from the same origin (e.g. localhost during development).
const CACHE = 'folio-v1';

const PRECACHE = [
  './',
  'icons/icon.svg',
  'manifest.json',
];

// Live data and auth — never cached. Drive in particular MUST bypass: caching a
// GET of the user's document would let a stale copy be served back as if current,
// silently defeating the revision check that protects against lost edits.
const BYPASS = [
  'googleapis.com',          // Drive appData read/write + userinfo
  'accounts.google.com',     // Google Identity Services
  'stockanalysis.com',       // history, dividends, earnings, quotes
  'quote.cnbc.com',          // batched live quotes
  'open.er-api.com',         // FX rate
  'raw.githubusercontent.com', // GICS sector map (has its own localStorage TTL)
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(PRECACHE.map(url => c.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // Pass through live data sources uncached
  if (BYPASS.some(h => url.hostname.includes(h))) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(res => {
        if (res.ok && res.type !== 'opaque') {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        }
        return res;
      }).catch(() => cached); // return stale on network failure

      // Cache-first for CDN assets, network-first for the app shell
      const isCDN = url.hostname.includes('jsdelivr') || url.hostname.includes('unpkg') || url.hostname.includes('gstatic');
      return isCDN && cached ? cached : (network || cached);
    })
  );
});
