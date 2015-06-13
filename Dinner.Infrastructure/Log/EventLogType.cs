namespace Dinner.Infrastructure.Log
{
    /// <summary>
    /// The event log type.
    /// </summary>
    public enum EventLogType
    {
        /// <summary>
        /// The error.
        /// </summary>
        Error,

        /// <summary>
        /// The warning.
        /// </summary>
        Warning,

        /// <summary>
        /// The information.
        /// </summary>
        Information,

        /// <summary>
        /// The verbose.
        /// </summary>
        Verbose
    }
}