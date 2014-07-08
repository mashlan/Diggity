using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Diggity.Exceptions;
using Diggity.Services;

namespace Diggity.WebApi
{
    public class BaseApiController : ApiController
    {
        protected readonly IServiceAggregate ServiceAggregate;

        public BaseApiController(IServiceAggregate serviceAggregate)
        {
            ServiceAggregate = serviceAggregate;
        }

        protected HttpResponseMessage ApiGetFunc<TReturnType>(Func<TReturnType> action, string message)
        {
            try
            {
                var results = action();
                return results != null
                    ? Request.CreateResponse(HttpStatusCode.OK, results)
                    : Request.CreateErrorResponse(HttpStatusCode.NotFound, message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        protected HttpResponseMessage ApiSaveFunc<TReturnType>(Action<TReturnType> action, TReturnType entity)
        {
            try
            {
                action(entity);
                return Request.CreateResponse(HttpStatusCode.OK, "success");
            }
            catch (ValidationException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        protected HttpResponseMessage ApiDeleteFunc<TReturnType>(Func<TReturnType> action)
        {
            try
            {
                action();
                return Request.CreateResponse(HttpStatusCode.OK, "success");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
