using System;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Routing;

namespace Dinner.Helpers
{
    public static class HtmlHelperExtensions
    {
        public static MvcHtmlString MenuActionLink(
                                    this HtmlHelper helper, 
                                    string linkText, 
                                    string actionName, 
                                    string controllerName,
                                    object routeValues = null)
        {
            var linkItem = new TagBuilder("li");
           
            var curControllerName = (string)helper.ViewContext.RouteData.Values["controller"];
            var curActionName = (string)helper.ViewContext.RouteData.Values["action"];

            if (curControllerName == controllerName && curActionName == actionName)
            {
                linkItem.AddCssClass("active");
            }

            linkItem.InnerHtml =
                helper.ActionLink(linkText, actionName, controllerName, routeValues, new { target = "_self" })
                    .ToHtmlString();

            return MvcHtmlString.Create(linkItem.ToString());
        }

        /// <summary>
        /// The angular template.
        /// </summary>
        /// <param name="helper">
        /// The helper.
        /// </param>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="ScriptTag"/>.
        /// </returns>
        public static ScriptTag AngularTemplate(this HtmlHelper helper, string id)
        {
            return new ScriptTag(helper, "text/ng-template", id);
        }
    }
}