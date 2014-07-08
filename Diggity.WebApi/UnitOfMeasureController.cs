using System;
using System.Net.Http;
using Diggity.Entities;
using Diggity.Services;

namespace Diggity.WebApi
{
    public class UnitOfMeasureController : BaseApiController
    {
        // GET: api/UnitOfMeasure
        public UnitOfMeasureController(IServiceAggregate serviceAggregate)
            : base(serviceAggregate)
        {
        }

        public HttpResponseMessage Get()
        {
            return ApiGetFunc(ServiceAggregate.UnitOfMeasure.GetAll, null);
        }

        public HttpResponseMessage Get(int id)
        {
            Func<IUnitOfMeasure> func = () => ServiceAggregate.UnitOfMeasure.GetById(id);
            return ApiGetFunc(func, string.Format("Unit Of Measure with Id {0} was not found.", id));
        }

        public HttpResponseMessage Post(UnitOfMeasure unit)
        {
            return ApiSaveFunc(ServiceAggregate.UnitOfMeasure.Create, unit);
        }

        public HttpResponseMessage Put(UnitOfMeasure data)
        {
            return ApiSaveFunc(ServiceAggregate.UnitOfMeasure.Update, data);
        }

        public HttpResponseMessage Delete(int id)
        {
            Func<bool> func = () => ServiceAggregate.UnitOfMeasure.Delete(id);
            return ApiDeleteFunc(func);
        }
    }
}