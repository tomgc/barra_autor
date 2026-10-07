// SERVICE WORKER (§33). Offline: precarga los recursos de la app y responde desde caché.
// Estrategia stale-while-revalidate: responde con la copia guardada y la actualiza en segundo plano.
// Al publicar cambios, subir CACHE_VERSION para que los clientes descarten la caché anterior.

const CACHE_VERSION = "mba-v1";
const PRECACHE = [
  "./",
  "./app.js",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png",
  "./data/collections.js",
  "./data/demo-user-state.js",
  "./data/ingredients.js",
  "./data/recipes.js",
  "./index.html",
  "./js/backup.js",
  "./js/engine/adjust.js",
  "./js/engine/compare.js",
  "./js/engine/discovery.js",
  "./js/engine/estimates.js",
  "./js/engine/matching.js",
  "./js/engine/scaling.js",
  "./js/engine/search.js",
  "./js/history.js",
  "./js/lab.js",
  "./js/storage.js",
  "./js/timer.js",
  "./js/units.js",
  "./js/util.js",
  "./manifest.json",
  "./styles.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE_VERSION).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: req.mode === "navigate" });
      const network = fetch(req)
        .then((res) => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => null);
      if (cached) {
        event.waitUntil(network);
        return cached;
      }
      const res = await network;
      if (res) return res;
      if (req.mode === "navigate") return cache.match("./index.html");
      return new Response("Sin conexión", { status: 503, statusText: "Offline" });
    })
  );
});
