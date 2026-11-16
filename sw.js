/* Donegal Farm service worker: lets the app open with no signal. index.html is network-first (patches go live
   at once when online); the versioned Firebase SDK files from gstatic are cached on first use. Data sync is
   handled by Firestore's own offline cache, not here. The weaner price feed (prices.json) is never cached here –
   it always goes to the network; the app keeps its own dated copy for use without signal. */
var CACHE = 'donegal-farm-v2.1';
var SDK = ['firebase-app.js', 'firebase-auth.js', 'firebase-firestore.js'].map(function (f) { return 'https://www.gstatic.com/firebasejs/10.14.1/' + f; });
self.addEventListener('install', function (e) {
  e.waitUntil(Promise.all([
    caches.open(CACHE).then(function (c) { return c.addAll([new Request('./', { cache: 'reload' })]); }),
    caches.open('donegal-firebase-sdk').then(function (c) { return Promise.all(SDK.map(function (u) { return c.match(u).then(function (hit) { return hit || fetch(u, { mode: 'cors' }).then(function (r) { if (r.ok) return c.put(u, r); }); }); })); }).catch(function () {})
  ]).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k.indexOf('donegal-farm-') === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin === 'https://www.gstatic.com' && url.pathname.indexOf('/firebasejs/') === 0) {
    e.respondWith(caches.open('donegal-firebase-sdk').then(function (c) { return c.match(e.request).then(function (hit) { return hit || fetch(e.request).then(function (r) { if (r.ok) c.put(e.request, r.clone()); return r; }); }); }));
    return;
  }
  if (url.origin !== location.origin) return;
  /* weaner price feed: always from the network, never from a cache (the app keeps its own dated copy for no-signal use) */
  if (/\/prices\.json$/.test(url.pathname)) { e.respondWith(fetch(new Request(e.request, { cache: 'no-store' }))); return; }
  if (e.request.mode === 'navigate' || /\/(index\.html)?$/.test(url.pathname)) {
    e.respondWith(fetch(e.request).then(function (r) { if (r.ok) { var cp = r.clone(); caches.open(CACHE).then(function (c) { c.put('./', cp); }); } return r; })
      .catch(function () { return caches.open(CACHE).then(function (c) { return c.match('./'); }).then(function (hit) { return hit || new Response('Offline', { status: 503 }); }); }));
  }
});
