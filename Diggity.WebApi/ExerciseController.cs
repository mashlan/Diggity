using System;
using System.Net.Http;
using System.Web.Http;
using Diggity.Entities;
using Diggity.Services;

namespace Diggity.WebApi
{
    public class ExerciseController: BaseApiController
    {
        public ExerciseController(IServiceAggregate serviceAggregate) : base(serviceAggregate)
        {
        }

        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Get()
        {
            return ApiGetFunc(ServiceAggregate.Exercise.GetAllSimple, null);
        }

        public HttpResponseMessage Get(int id)
        {
            var message = string.Format("Exercise with Id {0} was not found.", id);
            Func<object> func = () => ServiceAggregate.Exercise.SingleSimple(e => e.Id == id);
            return ApiGetFunc(func, message);
        }

        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Post(Exercise exercise)
        {
            return ApiSaveFunc(ServiceAggregate.Exercise.Create, exercise);
        }

        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Put(Exercise exercise)
        {
            return ApiSaveFunc(ServiceAggregate.Exercise.Update, exercise);
        }

        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Delete(int id)
        {
            Func<bool> func = () => ServiceAggregate.Exercise.Delete(d => d.Id == id);
            return ApiDeleteFunc(func);
        }
    }
}
