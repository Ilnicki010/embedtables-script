export const getProjectById = async (id) => {
  // return await getData();
  return fetch(`${process.env.LAMBDA_ENDPOINT}/projects/data/${id}`)
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};
async function getData(url) {
  const cacheVersion = 1;
  const cacheName = `embedtables-${cacheVersion}`;
  try {
    const cacheStorage = await caches.open(cacheName);
    await cacheStorage.add(url);
    const data = await getCachedData(cacheName, url);
    return data;
  } catch (err) {
    console.log(err);
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
