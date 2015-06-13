using System;
using System.Web.Mvc;

using Dinner.Attributes;
using Dinner.Mail.Interfaces;
using Dinner.Mail.Models;

namespace Dinner.Controllers
{
    [Authorize]
    [Admin]
    public class AdminNotificationController : Controller
    {
        private IEmailSystem EmailSystem { get; set; }

        public AdminNotificationController(IEmailSystem emailSystem)
        {
            EmailSystem = emailSystem;
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(string notificationName)
        {
            string unsubscribe = "";
            string userName = "Test";
            string email = "";

            if (string.IsNullOrWhiteSpace(notificationName))
            {
                notificationName = "daily";
            }
            switch (notificationName.ToLower())
            {
                
                case "weekly":
                    EmailSystem.SendMail(new WeeklyNotificationTemplateModel(
                        email,
                        userName,
                        unsubscribe));
                    break;
                case "admin":
                    EmailSystem.SendMail(new AdminNotificationTemplateModel(
                        email,
                        "Text",
                        unsubscribe));
                    break;

                case "daily":
                default:
                    EmailSystem.SendMail(new DailyNotificationTemplateModel(
                        email,
                        userName,
                        DateTime.Now.AddDays(1).ToString("dd.MM.yyyy"),
                        unsubscribe));
                    break;
            }
            return View();
        }

    }
}
