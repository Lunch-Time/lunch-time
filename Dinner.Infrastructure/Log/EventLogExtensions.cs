namespace Dinner.Infrastructure.Log
{
    using System;

    /// <summary>
    /// Extensions for event logging.
    /// </summary>
    public static class EventLogExtensions
    {
        /// <summary>
        /// Logs the error.
        /// </summary>
        /// <param name="eventLog">The event log.</param>
        /// <param name="e">The decimal.</param>
        public static void LogError(this IEventLog eventLog, Exception e)
        {
            eventLog.Log(EventLogType.Error, string.Format("Exception: {0}", e.Message), e);
        }

        /// <summary>
        /// Logs the error.
        /// </summary>
        /// <param name="eventLog">The event log.</param>
        /// <param name="format">The format.</param>
        /// <param name="arguments">The arguments.</param>
        public static void LogError(this IEventLog eventLog, string format, params object[] arguments)
        {
            eventLog.Log(EventLogType.Error, string.Format(format, arguments), null);
        }

        /// <summary>
        /// Logs the warning.
        /// </summary>
        /// <param name="eventLog">The event log.</param>
        /// <param name="e">The exception.</param>
        public static void LogWarning(this IEventLog eventLog, Exception e)
        {
            eventLog.Log(EventLogType.Warning, string.Format("Exception: {0}", e.Message), e);
        }

        /// <summary>
        /// Logs the warning.
        /// </summary>
        /// <param name="eventLog">The event log.</param>
        /// <param name="format">The format.</param>
        /// <param name="arguments">The arguments.</param>
        public static void LogWarning(this IEventLog eventLog, string format, params object[] arguments)
        {
            eventLog.Log(EventLogType.Warning, string.Format(format, arguments), null);
        }

        /// <summary>
        /// Logs the information.
        /// </summary>
        /// <param name="eventLog">The event log.</param>
        /// <param name="format">The format.</param>
        /// <param name="arguments">The arguments.</param>
        public static void LogInformation(this IEventLog eventLog, string format, params object[] arguments)
        {
            eventLog.Log(EventLogType.Information, string.Format(format, arguments), null);
        }

        /// <summary>
        /// Logs the verbose.
        /// </summary>
        /// <param name="eventLog">The event log.</param>
        /// <param name="format">The format.</param>
        /// <param name="arguments">The arguments.</param>
        public static void LogVerbose(this IEventLog eventLog, string format, params object[] arguments)
        {
            eventLog.Log(EventLogType.Verbose, string.Format(format, arguments), null);
        }
    }
}