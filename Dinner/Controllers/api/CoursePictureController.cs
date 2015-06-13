using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;

using Dinner.Entities.Course;
using Dinner.Entities.Exceptions;
using Dinner.Services;

namespace Dinner.Controllers.Api
{
    [AllowAnonymous]
    public class CoursePictureController : ApiController
    {
        private readonly IImageService imageService;

        public CoursePictureController(IImageService imageService)
        {
            this.imageService = imageService;
        }

        // GET api/coursepicture/thumbnail?companyid={companyid}&courseid={courseid}
        // OR api/coursepicture/thumbnail?tempName={tempName}
        [HttpGet, ActionName("thumbnail")]
        public HttpResponseMessage GetThumbnail([FromUri]CoursePictureQuery query)
        {
            CoursePictureModel pictureModel = null;
            var response = new HttpResponseMessage();

            try
            {
                if (!string.IsNullOrEmpty(query.TempName))
                {
                    pictureModel = imageService.GetTempPicture(query.TempName);
                }
                else if (query.CompanyID > 0 && query.CourseID > 0)
                {
                    pictureModel = imageService.GetThumbnail(query.CompanyID, query.CourseID);
                }
            }
            catch (CourseNotFoundException ex)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            Stream outputStream = null;
            if (pictureModel != null && pictureModel.Picture != null && pictureModel.Picture.Length > 0)
            {
                outputStream = pictureModel.Picture;
            }
            else
            {
                string path = System.Web.HttpContext.Current.Server.MapPath(@"~/images/empty-course.thumbnail.png");
                outputStream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
            }
            outputStream.Position = 0;
            response.Content = new StreamContent(outputStream);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");

            return response;
        }

        // GET api/coursepicture/image?companyid={companyid}&courseid={courseid}
        // OR api/coursepicture/image?tempName={tempName}
        [HttpGet, ActionName("image")]
        public HttpResponseMessage GetImage([FromUri]CoursePictureQuery query)
        {
            CoursePictureModel pictureModel = null;
            var response = new HttpResponseMessage();

            try
            {
                if (!string.IsNullOrEmpty(query.TempName))
                {
                    pictureModel = imageService.GetTempPicture(query.TempName);
                }
                else if (query.CompanyID > 0 && query.CourseID > 0)
                {
                    pictureModel = imageService.GetPicture(query.CompanyID, query.CourseID);
                }
            }
            catch (CourseNotFoundException ex)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            Stream outputStream = null;
            if (pictureModel != null && pictureModel.Picture != null && pictureModel.Picture.Length > 0)
            {
                outputStream = pictureModel.Picture;
            }
            else
            {
                string path = System.Web.HttpContext.Current.Server.MapPath(@"~/images/empty-course.png");
                outputStream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
            }
            outputStream.Position = 0;
            response.Content = new StreamContent(outputStream);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");

            return response;
        }

        // GET api/coursepicture/image?companyid={companyid}&courseid={courseid}
        [HttpPost, ActionName("image")]
        public Task<IEnumerable<string>> Post([FromUri]CoursePictureQuery query)
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(Request.CreateResponse(
                HttpStatusCode.NotAcceptable,
                "This request is not properly formatted"));
            }

            try
            {
                var streamProvider = new MultipartMemoryStreamProvider();

                var task = Request.Content.ReadAsMultipartAsync(streamProvider)
                      .ContinueWith<IEnumerable<string>>(t =>
                      {
                          if (t.IsFaulted || t.IsCanceled)
                          {
                              throw new HttpResponseException(HttpStatusCode.InternalServerError);
                          }

                          var addedId = streamProvider.Contents
                              .Where(i => (i.Headers.ContentType != null && !string.IsNullOrEmpty(i.Headers.ContentType.MediaType)))
                              .Select(i =>
                              {
                                  Stream stream = i.ReadAsStreamAsync().Result;
                                  string pictureName = imageService.SavePictureToTemp(query.CompanyID, query.CourseID, stream);
                                  return pictureName;
                              });
                          return addedId;
                      });
                return task;
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateResponse(
                HttpStatusCode.NotAcceptable,
                "Error: " + ex.Message));
            }
        }

        public class CoursePictureQuery
        {
            public int CompanyID { get; set; }
            public int CourseID { get; set; }
            public string TempName { get; set; }
        }
    }
}
