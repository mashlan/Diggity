using System;
using System.Net.Http;
using System.Web.Http;
using Diggity.Entities;
using Diggity.Services;

namespace Diggity.WebApi
{
    public class ExerciseTypeController : BaseApiController
    {
        public ExerciseTypeController(IServiceAggregate serviceAggregate)
            : base(serviceAggregate)
        {
        }

        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Get()
        {
            return ApiGetFunc(ServiceAggregate.ExerciseType.GetAllSimple, null);
        }

        public HttpResponseMessage Get(int id)
        {
            var message = string.Format("Exercise Type with Id {0} was not found.", id);
            Func<object> func = () => ServiceAggregate.ExerciseType.SingleSimple(e => e.Id == id);
            return ApiGetFunc(func, message);
        }

        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Post(ExerciseType exerciseType)
        {
            return ApiSaveFunc(ServiceAggregate.ExerciseType.Create, exerciseType);
        }

        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Put(ExerciseType exerciseType)
        {
            return ApiSaveFunc(ServiceAggregate.ExerciseType.Update, exerciseType);
        }

        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Delete(int id)
        {
            Func<bool> func = () => ServiceAggregate.ExerciseType.Delete(d => d.Id == id);
            return ApiDeleteFunc(func);
        }
    }
}