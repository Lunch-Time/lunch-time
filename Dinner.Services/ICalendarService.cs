using System;

namespace Dinner.Services
{
    /// <summary>
    /// Manages the calendar.
    /// </summary>
    public interface ICalendarService
    {
        /// <summary>
        /// Returns date of the next working day.
        /// </summary>
        /// <param name="date">The date.</param>
        /// <returns>The working day.</returns>
        DateTime GetNextWorkingDay(DateTime date);

        /// <summary>
        /// Determines whether the specified day is working day.
        /// </summary>
        /// <param name="day">The day.</param>
        /// <returns>True whether the specified day is working day.</returns>
        bool IsWorkingDay(DateTime day);

        /// <summary>
        /// Returns date of the previous working day.
        /// </summary>
        /// <param name="date">The date.</param>
        /// <returns>The working day.</returns>
        DateTime GetPreviousWorkingDay(DateTime date);

        /// <summary>
        /// Returns current date and time in russian standart time zone.
        /// </summary>
        /// <returns>The date and time in russian standart time zone.</returns>
        DateTime GetCurrentDate();

        DateTime GetDateWithNewTime(DateTime day, int hours, int minutes);
    }
}
