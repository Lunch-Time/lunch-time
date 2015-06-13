namespace Dinner.Services.Impl
{
    using System;

    internal sealed class CalendarService : ICalendarService
    {
        /// <summary>
        /// The user time zone.
        /// </summary>
        private TimeZoneInfo userTimeZone;

        /// <summary>
        /// Gets the user time zone.
        /// </summary>
        private TimeZoneInfo UserTimeZone
        {
            get
            {
                return this.userTimeZone
                       ?? (this.userTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Russian Standard Time"));
            }
        }

        /// <inheritdoc />
        public DateTime GetCurrentDate()
        {
            return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, this.UserTimeZone);
        }

        public DateTime GetDateWithNewTime(DateTime day, int hours, int minutes)
        {
            return new DateTime(day.Year, day.Month, day.Day, hours, minutes, 0);
        }

        /// <inheritdoc />
        public DateTime GetNextWorkingDay(DateTime startDate)
        {
            DateTime nextDay = startDate;

            do
            {
                nextDay = nextDay.Date.AddDays(1);
            }
            while (!this.IsWorkingDay(nextDay));

            return nextDay;
        }

        /// <inheritdoc />
        public DateTime GetPreviousWorkingDay(DateTime date)
        {
            DateTime previousDay = date;

            do
            {
                previousDay = previousDay.Date.AddDays(-1);
            }
            while (!this.IsWorkingDay(previousDay));

            return previousDay;
        }

        /// <inheritdoc />
        public bool IsWorkingDay(DateTime day)
        {
            return day.DayOfWeek != DayOfWeek.Saturday && day.DayOfWeek != DayOfWeek.Sunday;
        }
    }
}