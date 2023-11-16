// https://habr.com/ru/companies/ruvds/articles/349858/
// https://www.youtube.com/watch?v=ifroMW_F4Sc&t=1s
// https://www.youtube.com/watch?v=p45_GsBczJk

const CACHE_NAME = 'my-web-cache-v8';
const URLS_TO_CACHE = [
    '/', // index.html
    '/index.js',
    '/styles.css'
];

self.addEventListener('install', async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(URLS_TO_CACHE)
});

self.addEventListener('activate', async (event) => {
    const cacheNames = await caches.keys();
    console.log('namees', cacheNames)
    await Promise.all(
        cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => caches.delete(name))
    );

    console.log('namees', cacheNames, CACHE_NAME)
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        (async () => {
            const cachedData = await caches.match(event.request);
            if (cachedData) {
                return cachedData
            };

            const fetchRequest = event.request.clone();
            const fetchResponse = await fetch(fetchRequest);

            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic'){
                return fetchResponse
            };

            const responseToCache = fetchResponse.clone();

            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, responseToCache);

            return fetchResponse;
        })()
    )
})