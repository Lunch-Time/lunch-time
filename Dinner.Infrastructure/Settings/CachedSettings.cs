namespace Dinner.Infrastructure.Settings
{
    using System;
    using System.Diagnostics.Contracts;

    using Dinner.Infrastructure.Cache;

    /// <summary>
    /// Provides an access to the configuration cached in-memory.
    /// </summary>
    public sealed class CachedSettings : ISettings
    {
        /// <summary>
        /// The inner settings.
        /// </summary>
        private readonly ISettings innerSettings;

        /// <summary>
        /// The cache manager.
        /// </summary>
        private readonly ICacheManager cacheManager;

        /// <summary>
        /// Initializes a new instance of the <see cref="CachedSettings" /> class.
        /// </summary>
        /// <param name="innerSettings">The inner settings.</param>
        /// <param name="cacheManager">The cache manager.</param>
        public CachedSettings(ISettings innerSettings, ICacheManager cacheManager)
        {
            Contract.Requires(innerSettings != null);
            Contract.Requires(cacheManager != null);

            this.innerSettings = innerSettings;
            this.cacheManager = cacheManager;
        }

        /// <inheritdoc />
        public T GetValue<T>(string configKey)
        {
            Contract.Requires(!string.IsNullOrEmpty(configKey));

            return this.DecorateInnerCall(configKey, inner => inner.GetValue<T>(configKey));
        }

        /// <inheritdoc />
        public T GetValue<T>(string configKey, T defaultValue)
        {
            Contract.Requires(!string.IsNullOrEmpty(configKey));

            return this.DecorateInnerCall(configKey, inner => inner.GetValue(configKey, defaultValue));
        }

        /// <summary>
        /// Decorates the inner call.
        /// </summary>
        /// <typeparam name="T">Type of the value.</typeparam>
        /// <param name="configKey">The configuration key.</param>
        /// <param name="innerCall">The inner call.</param>
        /// <returns>The value.</returns>
        private T DecorateInnerCall<T>(string configKey, Func<ISettings, T> innerCall)
        {
            Contract.Requires(!string.IsNullOrEmpty(configKey));
            Contract.Requires(innerCall != null);

            string cacheKey = string.Format("Settings." + configKey);

            return this.cacheManager.GetOrAdd(
                cacheKey, () => innerCall(this.innerSettings), DateTimeOffset.Now.AddMinutes(10));
        }
    }
}