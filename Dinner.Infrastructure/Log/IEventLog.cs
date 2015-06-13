namespace Dinner.Infrastructure.Log
{
    /// <summary>
    /// The event log.
    /// </summary>
    public interface IEventLog
    {
        /// <summary>
        /// Logs the specified event log type.
        /// </summary>
        /// <param name="eventLogType">Type of the event log.</param>
        /// <param name="message">The message.</param>
        /// <param name="details">The details.</param>
        void Log(EventLogType eventLogType, string message, object details);
    }
}
