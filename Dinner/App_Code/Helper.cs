namespace Dinner
{
    using System.Web.Mvc;
    using System.Web.WebPages;

    /// <summary>
    /// Base helper class.
    /// </summary>
    public class Helper : HelperPage
    {
        /// <summary>
        /// Gets the HTML helper.
        /// </summary>
        public static new WebViewPage Page
        {
            get { return (WebViewPage)WebPageContext.Current.Page; }
        }

        /// <summary>
        /// Gets the HTML helper.
        /// </summary>
        public static new HtmlHelper Html
        {
            get { return ((WebViewPage)WebPageContext.Current.Page).Html; }
        }

        /// <summary>
        /// Gets the HTML helper.
        /// </summary>
        public static UrlHelper Url
        {
            get { return ((WebViewPage)WebPageContext.Current.Page).Url; }
        }
    }
}