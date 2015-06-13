namespace Dinner.Attributes
{
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Http.Filters;

    public class ApiExceptionFilterAttribute : ExceptionFilterAttribute 
    {
        /// <summary>
        /// Raises the exception event.
        /// </summary>
        /// <param name="context">The context for the action.</param>
        public override void OnException(HttpActionExecutedContext context)
        {
/*            context.Response = new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent(context.Exception.Message),
                    ReasonPhrase = context.Exception.Message
                };*/

            throw new HttpResponseException(
                new HttpResponseMessage(HttpStatusCode.InternalServerError)
                    {
                        Content = new StringContent(context.Exception.Message),
                        ReasonPhrase = context.Exception.Message
                    });

            //base.OnException(context);
        }
    }
}