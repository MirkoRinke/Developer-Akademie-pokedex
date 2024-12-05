/**
 * @fileoverview This service worker script handles caching of Pokémon images fetched from the PokeAPI.
 * It intercepts fetch requests for image URLs, caches them, and serves them from the cache to improve performance.
 */

/**
 * Regular expression to match image URLs from the PokeAPI sprites repository.
 * The URLs should start with "https://raw.githubusercontent.com/PokeAPI/sprites/"
 * and end with a file name that has an extension of either .png, .svg, or .gif.
 *
 * @constant {RegExp}
 */
const imgRe = /https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/[\/-\w\d]+\/[\d\w-]+\.(?:png|svg|gif)/,
  version = 1;
self.addEventListener("fetch", function (e) {
  e.request.url.match(imgRe) &&
    e.respondWith(
      caches.match(e.request).then(function (t) {
        return (
          t ||
          fetch(e.request)
            .then(function (t) {
              return (
                e.request.url.match(imgRe) &&
                  caches.open("pokeapi-js-wrapper-images-1").then(function (t) {
                    t.add(e.request.url);
                  }),
                t
              );
            })
            .catch(function (e) {
              console.error(e);
            })
        );
      })
    );
}),
  self.addEventListener("install", function (e) {
    self.skipWaiting();
  });
