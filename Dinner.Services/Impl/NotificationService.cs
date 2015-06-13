using System;
using System.Collections.Generic;
using System.Text;

using Dinner.Entities.Notification;
using Dinner.Mail.Interfaces;
using Dinner.Mail.Models;
using Dinner.Storage;

namespace Dinner.Services.Impl
{
    using Dinner.Infrastructure;

    public class NotificationService : INotificationService
    {
        private readonly INotificationStorage notificationStorage;

        private readonly IEmailSystem emailSystem;

        private readonly ICalendarService calendarService;

        /// <summary>
        /// Initializes a new instance of the <see cref="NotificationService"/> class.
        /// </summary>
        /// <param name="notificationStorage">The notification storage.</param>
        /// <param name="emailSystem">The email system.</param>
        /// <param name="calendarService">The calendar service.</param>
        public NotificationService(INotificationStorage notificationStorage, IEmailSystem emailSystem, ICalendarService calendarService)
        {
            this.notificationStorage = notificationStorage;
            this.emailSystem = emailSystem;
            this.calendarService = calendarService;
        }

        public IEnumerable<UserNotificationContainer> SendWeeklyOrDailyNotification()
        {
            DateTime fromDate; 
            DateTime toDate;

            DateTime currentDate = this.calendarService.GetCurrentDate();
            string dateName = GetDayName(currentDate.AddDays(1));
            bool isNextDayHoliday = !this.calendarService.IsWorkingDay(currentDate.AddDays(1));

            if (!this.calendarService.IsWorkingDay(currentDate))
            {
                return new UserNotificationContainer[0];
            }

            if (isNextDayHoliday)
            {
                fromDate = this.calendarService.GetNextWorkingDay(currentDate);
                toDate = fromDate.EndOfWeek();
            }
            else
            {
                fromDate = currentDate.AddDays(1);
                toDate = fromDate.AddDays(1);
            }

            IDictionary<int, UserNotificationContainer> result = 
                notificationStorage.GetUsersForNotification(fromDate, toDate);

            foreach (var keyValue in result)
            {
                string unsubscribePath = string.Format(
                    "http://lunch-time.co/account/unsubscribe?id={0}",
                    keyValue.Value.UserID);

                if (isNextDayHoliday)
                {
                    if (keyValue.Value.SendWeeklyNotification)
                    {
                        emailSystem.SendMail(new WeeklyNotificationTemplateModel(
                            keyValue.Value.Email,
                            keyValue.Value.Name, 
                            unsubscribePath));
                    }
                    else if (keyValue.Value.SendDailyNotification)
                    {
                        emailSystem.SendMail(new DailyNotificationTemplateModel(
                            keyValue.Value.Email,
                            keyValue.Value.Name,
                            dateName, 
                            unsubscribePath));
                    }
                }
                else if (keyValue.Value.SendDailyNotification)
                {
                    emailSystem.SendMail(new DailyNotificationTemplateModel(
                        keyValue.Value.Email,
                        keyValue.Value.Name, 
                        dateName, 
                        unsubscribePath));
                }
            }

            return result.Values;
        }

        private string GetDayName(DateTime date, bool isShort = false)
        {
            var res = new StringBuilder();
            if (!isShort)
            {
                res.AppendFormat("{0} (", date.ToString("dd.MM.yyyy"));
            }
            switch (date.DayOfWeek)
            {
                case DayOfWeek.Sunday:
                    res.Append("воскресение");
                    break;
                case DayOfWeek.Monday:
                    res.Append("понедельник");
                    break;
                case DayOfWeek.Tuesday:
                    res.Append("вторник");
                    break;
                case DayOfWeek.Wednesday:
                    res.Append("среда");
                    break;
                case DayOfWeek.Thursday:
                    res.Append("четверг");
                    break;
                case DayOfWeek.Friday:
                    res.Append("пятница");
                    break;
                case DayOfWeek.Saturday:
                    res.Append("суббота");
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
            if (!isShort)
            {
                res.Append(")");
            }
            return res.ToString();
        }
    }
}
