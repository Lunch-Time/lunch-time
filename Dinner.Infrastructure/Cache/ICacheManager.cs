namespace Dinner.Infrastructure.Cache
{
    using System;
    using System.Runtime.Caching;

    /// <summary>
    /// Manages in-memory caching.
    /// </summary>
    public interface ICacheManager
    {
        /// <summary>
        /// Adds the object to the cache.
        /// </summary>
        /// <typeparam name="T">Type of the item.</typeparam>
        /// <param name="key">The key.</param>
        /// <param name="cacheItem">The cache item.</param>
        /// <param name="cacheItemPolicy">The cache item policy.</param>
        void Add<T>(string key, T cacheItem, CacheItemPolicy cacheItemPolicy);

        /// <summary>
        /// Adds the object to the cache.
        /// </summary>
        /// <typeparam name="T">Type of the item.</typeparam>
        /// <param name="key">The key.</param>
        /// <param name="cacheItem">The cache item.</param>
        /// <param name="absoluteExpiration">The absolute expiration.</param>
        void Add<T>(string key, T cacheItem, DateTimeOffset absoluteExpiration);

        /// <summary>
        /// Gets the cached value or add the new.
        /// </summary>
        /// <typeparam name="T">Type of value.</typeparam>
        /// <param name="key">The key.</param>
        /// <param name="itemFactory">The item factory.</param>
        /// <param name="absoluteExpiration">The absolute expiration.</param>
        /// <returns>The value.</returns>
        T GetOrAdd<T>(string key, Func<T> itemFactory, DateTimeOffset absoluteExpiration);

        /// <summary>
        /// Determines whether cache contains an item with the specified key.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <returns>True whether cache contains an item with the specified key.</returns>
        bool Contains(string key);

        /// <summary>
        /// Gets the item by the specified key.
        /// </summary>
        /// <typeparam name="T">Type of the item.</typeparam>
        /// <param name="key">The key.</param>
        /// <returns>The item.</returns>
        T Get<T>(string key);
    }
}
