using System;
using System.Net.Http;
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

        public HttpResponseMessage Get()
        {
            return ApiGetFunc(ServiceAggregate.ExerciseType.GetAll, null);
        }

        public HttpResponseMessage Get(int id)
        {
            var message = string.Format("Exercise Type with Id {0} was not found.", id);
            Func<ExerciseType> func = () => ServiceAggregate.ExerciseType.GetById(id);
            return ApiGetFunc(func, message);
        }

        public HttpResponseMessage Post(ExerciseType exerciseType)
        {
            return ApiSaveFunc(ServiceAggregate.ExerciseType.Create, exerciseType);
        }
        
        public HttpResponseMessage Put(ExerciseType exerciseType)
        {
            return ApiSaveFunc(ServiceAggregate.ExerciseType.Update, exerciseType);
        }

        public HttpResponseMessage Delete(int id)
        {
            Func<bool> func = () => ServiceAggregate.ExerciseType.Delete(id);
            return ApiDeleteFunc(func);
        }
    }
}