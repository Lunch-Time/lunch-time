using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

using Dinner.Entities.Notification;
using Dinner.Services;

namespace Dinner.Controllers.Api
{
    public class NotificationController : ApiController
    {
        private readonly INotificationService notificationService;

        public NotificationController(
            INotificationService notificationService)
        {
            this.notificationService = notificationService;
        }

        // GET api/notification/Send/<id>
        [HttpGet, ActionName("Send")]
        public string Send(string id)
        {
            if (id != "YOUR_KEY")
            {
                throw new HttpException(403, "Forbidden");
            }
            
            IEnumerable<UserNotificationContainer> result 
                = notificationService.SendWeeklyOrDailyNotification();

            return string.Join(",", result.Select(x => x.Name));
            // return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
