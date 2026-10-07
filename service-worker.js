// SERVICE WORKER (§33). Offline: precarga los recursos de la app y responde desde caché.
// Estrategia stale-while-revalidate: responde con la copia guardada y la actualiza en segundo plano.
// Al publicar cambios, subir CACHE_VERSION para que los clientes descarten la caché anterior.

const CACHE_VERSION = "mba-v4";
const PRECACHE = [
  "./",
  "./app.js",
  "./assets/cocktails/_generica-256.webp",
  "./assets/cocktails/_generica.webp",
  "./assets/cocktails/americano-256.webp",
  "./assets/cocktails/americano.webp",
  "./assets/cocktails/boulevardier-256.webp",
  "./assets/cocktails/boulevardier-seco-256.webp",
  "./assets/cocktails/boulevardier-seco.webp",
  "./assets/cocktails/boulevardier.webp",
  "./assets/cocktails/calafate-sour-256.webp",
  "./assets/cocktails/calafate-sour.webp",
  "./assets/cocktails/chilcano-256.webp",
  "./assets/cocktails/chilcano.webp",
  "./assets/cocktails/daiquiri-256.webp",
  "./assets/cocktails/daiquiri.webp",
  "./assets/cocktails/dark-n-stormy-256.webp",
  "./assets/cocktails/dark-n-stormy.webp",
  "./assets/cocktails/dry-martini-256.webp",
  "./assets/cocktails/dry-martini.webp",
  "./assets/cocktails/el-alfonso-256.webp",
  "./assets/cocktails/el-alfonso.webp",
  "./assets/cocktails/el-cardinale-256.webp",
  "./assets/cocktails/el-cardinale.webp",
  "./assets/cocktails/el-claridge-256.webp",
  "./assets/cocktails/el-claridge.webp",
  "./assets/cocktails/elderflower-martini-256.webp",
  "./assets/cocktails/elderflower-martini.webp",
  "./assets/cocktails/gimlet-256.webp",
  "./assets/cocktails/gimlet.webp",
  "./assets/cocktails/gin-fizz-256.webp",
  "./assets/cocktails/gin-fizz.webp",
  "./assets/cocktails/gin-tonic-256.webp",
  "./assets/cocktails/gin-tonic.webp",
  "./assets/cocktails/highland-sauco-256.webp",
  "./assets/cocktails/highland-sauco.webp",
  "./assets/cocktails/lucien-gaudin-256.webp",
  "./assets/cocktails/lucien-gaudin.webp",
  "./assets/cocktails/mandarina-mule-256.webp",
  "./assets/cocktails/mandarina-mule.webp",
  "./assets/cocktails/manhattan-256.webp",
  "./assets/cocktails/manhattan.webp",
  "./assets/cocktails/moscow-mule-256.webp",
  "./assets/cocktails/moscow-mule.webp",
  "./assets/cocktails/negroni-256.webp",
  "./assets/cocktails/negroni-pajarillo-256.webp",
  "./assets/cocktails/negroni-pajarillo.webp",
  "./assets/cocktails/negroni.webp",
  "./assets/cocktails/old-fashioned-256.webp",
  "./assets/cocktails/old-fashioned.webp",
  "./assets/cocktails/paper-plane-256.webp",
  "./assets/cocktails/paper-plane-casa-256.webp",
  "./assets/cocktails/paper-plane-casa.webp",
  "./assets/cocktails/paper-plane.webp",
  "./assets/cocktails/perfect-negroni-256.webp",
  "./assets/cocktails/perfect-negroni.webp",
  "./assets/cocktails/pisco-sour-256.webp",
  "./assets/cocktails/pisco-sour.webp",
  "./assets/cocktails/rob-roy-256.webp",
  "./assets/cocktails/rob-roy.webp",
  "./assets/cocktails/satans-tarde-256.webp",
  "./assets/cocktails/satans-tarde.webp",
  "./assets/cocktails/scotch-highball-256.webp",
  "./assets/cocktails/scotch-highball.webp",
  "./assets/cocktails/tom-collins-256.webp",
  "./assets/cocktails/tom-collins.webp",
  "./assets/cocktails/vermut-cooler-256.webp",
  "./assets/cocktails/vermut-cooler.webp",
  "./assets/cocktails/vesper-256.webp",
  "./assets/cocktails/vesper.webp",
  "./assets/cocktails/vodka-martini-256.webp",
  "./assets/cocktails/vodka-martini.webp",
  "./assets/cocktails/whiskey-sour-256.webp",
  "./assets/cocktails/whiskey-sour.webp",
  "./assets/cocktails/white-lady-256.webp",
  "./assets/cocktails/white-lady.webp",
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
