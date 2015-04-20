using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using Diggity.Services;
using Microsoft.AspNet.Identity;

namespace Diggity.WebApi
{
    public class WendlerExerciseController : BaseApiController
    {
        public WendlerExerciseController(IServiceAggregate serviceAggregate) : base(serviceAggregate)
        {
        }

        public HttpResponseMessage Get()
        {
            try
            {
                var userId = User.Identity.GetUserId();
                var results = ServiceAggregate.Exercise.FindWendlers(userId);
                
                return results != null
                    ? Request.CreateResponse(HttpStatusCode.OK, results)
                    : Request.CreateErrorResponse(HttpStatusCode.NotFound, "No records found");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public HttpResponseMessage Get(int id)
        {
            var message = string.Format("Wendler Exercise with Id {0} was not found.", id);
            Func<object> func = () => ServiceAggregate.Exercise.SingleSimple(e => e.WendlerGroupId == id);
            return ApiGetFunc(func, message);
        }
        
    }
}
