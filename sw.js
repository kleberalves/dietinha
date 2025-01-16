//sw.js
var cacheName = 'v1.0';

var cacheAssets = [
    'index.html',
    'js/data/lista.alimentos.js',
    'js/lib/forms.js',
    'js/lib/local.storage.js',
    'js/lib/show.message.js',
    'js/lib/treatments.js',
    'js/lib/uuidv4.js',
    'js/node/cachelist.js',
    'js/node/transform.js',
    'js/service/calculadora.alimentos.js',
    'js/service/cardapio.js',
    'js/service/configs.js',
    'js/service/consumo.diario.js',
    'js/sw/install.js',
    'js/view/calculadora.alimentos.js'
]

self.addEventListener("install", function (e) {
    console.log('Service Worker: Installed');


    e.waitUntil(caches.open(cacheName).then(function (cache) {
        console.log('Service Worker: Caching Files');

        // if (document.location.href.toLowerCase().indexOf("dietinha/") > -1) {
        //     for (var i = 0; i < cacheAssets.length; i++) {
        //         cacheAssets[i] = "/dietinha" + cacheAssets[i];
        //     }
        // }

        return cache.addAll(cacheAssets);
    }));
    //     .then(() => self.skipWaiting())
    // );
});
