namespace Dinner.Infrastructure.Log
{
    using System;
    using System.Collections.Generic;

    using Dinner.Infrastructure.Security;

    using Newtonsoft.Json;

    using NLog;

    internal sealed class EventLog : IEventLog
    {
        /// <summary>
        /// The principal provider.
        /// </summary>
        private readonly Lazy<IPrincipalProvider> principalProvider;

        /// <summary>
        /// The logger.
        /// </summary>
        private readonly Logger logger;

        /// <summary>
        /// The log level mapping.
        /// </summary>
        private readonly Dictionary<EventLogType, LogLevel> logLevelMapping;

        /// <summary>
        /// Initializes a new instance of the <see cref="EventLog" /> class.
        /// </summary>
        /// <param name="principalProvider">The principal provider.</param>
        public EventLog(Lazy<IPrincipalProvider> principalProvider)
        {
            this.principalProvider = principalProvider;
            this.logger = LogManager.GetLogger("Common");
            this.logLevelMapping = new Dictionary<EventLogType, LogLevel>
                {
                    { EventLogType.Verbose, LogLevel.Debug },
                    { EventLogType.Information, LogLevel.Info },
                    { EventLogType.Warning, LogLevel.Warn },
                    { EventLogType.Error, LogLevel.Error }
                };
        }

        public void Log(EventLogType eventLogType, string message, object details)
        {
            if (!this.logLevelMapping.ContainsKey(eventLogType))
            {
                throw new ArgumentOutOfRangeException(
                    "eventLogType", string.Format("Unsupported type of event message: {0}", eventLogType));
            }

            var logEvent = new LogEventInfo(this.logLevelMapping[eventLogType], this.logger.Name, message);
            logEvent.Properties["Details"] = this.GetStringRepresentation(details);
            logEvent.Properties["Principal"] = this.principalProvider.Value.Principal.Identity.Name;

            this.logger.Log(logEvent);
        }

        /// <summary>
        /// Gets the string representation.
        /// </summary>
        /// <param name="details">The details.</param>
        /// <returns>The string representation.</returns>
        private string GetStringRepresentation(object details)
        {
            return details == null ? string.Empty : JsonConvert.SerializeObject(details);
        }
    }
}