namespace Dinner.Infrastructure.Settings
{
    /// <summary>
    /// Settings of the application.
    /// </summary>
    public interface ISettings
    {
        /// <summary>
        /// Gets the value.
        /// </summary>
        /// <typeparam name="T">Type of the value.</typeparam>
        /// <param name="configKey">The configuration key.</param>
        /// <returns>The value.</returns>
        T GetValue<T>(string configKey);

        /// <summary>
        /// Gets the value.
        /// </summary>
        /// <typeparam name="T">Type of the value.</typeparam>
        /// <param name="configKey">The configuration key.</param>
        /// <param name="defaultValue">The default value.</param>
        /// <returns>The value.</returns>
        T GetValue<T>(string configKey, T defaultValue);
    }
}
