namespace Dinner.Infrastructure.Cache
{
    using System;
    using System.Diagnostics.Contracts;
    using System.Runtime.Caching;

    /// <summary>
    /// Manages in-memory cache.
    /// </summary>
    internal sealed class CacheManager : ICacheManager
    {
        /// <summary>
        /// The null value
        /// </summary>
        private static readonly object NullValue = new object();

        /// <summary>
        /// The memory cache.
        /// </summary>
        private readonly MemoryCache memoryCache;

        /// <summary>
        /// Initializes a new instance of the <see cref="CacheManager"/> class.
        /// </summary>
        public CacheManager()
        {
            this.memoryCache = MemoryCache.Default;
        }

        /// <inheritdoc />
        public void Add<T>(string key, T cacheItem, CacheItemPolicy cacheItemPolicy)
        {
            Contract.Requires(!string.IsNullOrWhiteSpace(key));
            Contract.Requires(cacheItemPolicy != null);

            this.memoryCache.Add(key, cacheItem, cacheItemPolicy);
        }

        /// <inheritdoc />
        public void Add<T>(string key, T cacheItem, DateTimeOffset absoluteExpiration)
        {
            Contract.Requires(!string.IsNullOrWhiteSpace(key));

            this.memoryCache.Add(key, cacheItem, absoluteExpiration);
        }

        /// <inheritdoc />
        public T GetOrAdd<T>(string key, Func<T> itemFactory, DateTimeOffset absoluteExpiration)
        {
            Contract.Requires(!string.IsNullOrWhiteSpace(key));
            Contract.Requires(itemFactory != null);

            if (this.memoryCache.Contains(key))
            {
                return this.Get<T>(key);
            }

            object newValue = itemFactory.Invoke();
            this.memoryCache.Add(key, newValue ?? NullValue, absoluteExpiration);

            return (T)newValue;
        }

        /// <inheritdoc />
        public bool Contains(string key)
        {
            Contract.Requires(!string.IsNullOrWhiteSpace(key));

            return this.memoryCache.Contains(key);
        }

        /// <inheritdoc />
        public T Get<T>(string key)
        {
            Contract.Requires(!string.IsNullOrWhiteSpace(key));

            var item = this.memoryCache.Get(key);
            return item == NullValue ? default(T) : (T)item;
        }
    }
}