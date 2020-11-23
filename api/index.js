export const getProjectById = async (id) => {
  return await getData(`${process.env.LAMBDA_ENDPOINT}/projects/data/${id}`);
};
async function getData(url) {
  const cacheVersion = 1;
  const cacheName = `embedtables-${cacheVersion}`;

  const cacheStorage = await caches.open(cacheName);
  try {
    console.log("Fetching fresh data");
    const data = fetch(url)
      .then((data) => data.json())
      .then((data) => data);
    await deleteOldCaches(cacheName);
    await cacheStorage.add(url, data);
    return data;
  } catch {
    console.log("Retrieved cached data");
    const cachedData = await getCachedData(cacheName, url);
    if (cachedData) {
      return cachedData;
    }
  }
}

// Get data from the cache.
async function getCachedData(cacheName, url) {
  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(url);

  if (!cachedResponse || !cachedResponse.ok) {
    return false;
  }

  return await cachedResponse.json();
}

// Delete any old caches to respect user's disk space.
async function deleteOldCaches(currentCache) {
  const keys = await caches.keys();

  for (const key of keys) {
    const isOurCache = "embedtables-" === key.substr(0, 6);

    if (currentCache === key || !isOurCache) {
      continue;
    }

    caches.delete(key);
  }
}
