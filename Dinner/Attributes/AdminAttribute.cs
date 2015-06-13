namespace Dinner.Attributes
{
    using System.Web.Mvc;

    public class AdminAttribute : ActionFilterAttribute
    {
        /// <summary>
        /// Called by the ASP.NET MVC framework before the action method executes.
        /// </summary>
        /// <param name="filterContext">The filter context.</param>
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            bool isAdmin = filterContext.HttpContext.User.IsInRole("Admin");
            if (!isAdmin)
            {
                filterContext.Result = new HttpNotFoundResult();
            }
        }
    }
}