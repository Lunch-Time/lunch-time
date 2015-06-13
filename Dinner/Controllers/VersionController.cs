namespace Dinner.Controllers
{
    using System.Web.Mvc;

    [AllowAnonymous]
    public class VersionController : Controller
    {
        public ActionResult Index()
        {
            return this.View();
        }
    }
}