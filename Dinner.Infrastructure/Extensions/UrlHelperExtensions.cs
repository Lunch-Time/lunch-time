namespace Dinner.Helpers
{
    using System.IO;
    using System.Web.Mvc;

    public static class UrlHelperExtensions
    {
        /// <summary>
        /// Cached the content.
        /// </summary>
        /// <param name="url">The URL.</param>
        /// <param name="contentPath">The content path.</param>
        /// <returns></returns>
        public static string CachedContent(this UrlHelper url, string contentPath)
        {
            var server = url.RequestContext.HttpContext.Server;
            var serverPath = server.MapPath(contentPath);
            var lastWriteTime = File.GetLastWriteTimeUtc(serverPath);
            var lastWriteBinaryTime = lastWriteTime.ToBinary().ToString();
            var cachedContentPath = string.Format("{0}?cache={1}", contentPath, lastWriteBinaryTime);
            return url.Content(cachedContentPath);
        } 
    }
}