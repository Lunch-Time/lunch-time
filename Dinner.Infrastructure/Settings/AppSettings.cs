namespace Dinner.Infrastructure.Settings
{
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Configuration;
    using System.Diagnostics.Contracts;

    /// <summary>
    /// Provides an access to the settings from appConfig section.
    /// </summary>
    public sealed class AppSettings : ISettings
    {
        /// <summary>
        /// The settings.
        /// </summary>
        private readonly IDictionary<string, string> settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="AppSettings"/> class.
        /// </summary>
        public AppSettings()
        {
            this.settings = new Dictionary<string, string>();

            foreach (var key in ConfigurationManager.AppSettings.AllKeys)
            {
                this.settings[key] = ConfigurationManager.AppSettings[key];
            }
        }

        /// <inheritdoc />
        public T GetValue<T>(string configKey)
        {
            Contract.Requires(!string.IsNullOrEmpty(configKey));

            if (!this.settings.ContainsKey(configKey))
            {
                throw new SettingsPropertyNotFoundException(
                    string.Format("Configuration value with key \"{0}\" have not been found", configKey));
            }

            var converter = TypeDescriptor.GetConverter(typeof(T));
            return (T)converter.ConvertFrom(this.settings[configKey]);
        }

        /// <inheritdoc />
        public T GetValue<T>(string configKey, T defaultValue)
        {
            Contract.Requires(!string.IsNullOrEmpty(configKey));

            return this.settings.ContainsKey(configKey) ? this.GetValue<T>(configKey) : defaultValue;
        }
    }
}
