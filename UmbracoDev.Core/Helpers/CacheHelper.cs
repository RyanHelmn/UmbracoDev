using System;
using System.Runtime.Caching;

namespace UmbracoDev.Core.Helpers
{
    public static class CacheHelper
    {
        /// <summary>
        /// Get or store an object in the cache by the cache key
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="cacheTimeInMinutes"></param>
        /// <param name="store"></param>
        /// <returns></returns>
        public static T GetOrStore<T>(string key, int cacheTimeInMinutes, Func<T> store)
        {
            var cache = MemoryCache.Default;
            var cachedObject = (T)cache[key];
            if (cachedObject == null)
            {
                var policy = new CacheItemPolicy
                {
                    AbsoluteExpiration = DateTimeOffset.Now.AddMinutes(cacheTimeInMinutes)
                };
                cachedObject = store();
                cache.Set(key, cachedObject, policy);
            }
            return cachedObject;
        }

        public static T Get<T>(string key)
        {
            var cache = MemoryCache.Default;
            var cachedObject = (T)cache[key];
            return cachedObject;
        }

        public static void Clear(string key)
        {
            var cache = MemoryCache.Default;
            var cachedObject = cache[key];

            if (cachedObject == null)
            {
                return;
            }

            cache.Remove(key);
            return;
        }
    }
}
