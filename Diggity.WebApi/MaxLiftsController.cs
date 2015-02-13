using System;
using System.Net.Http;
using Diggity.Entities;
using Diggity.Services;
using Microsoft.AspNet.Identity;

namespace Diggity.WebApi
{
    public class MaxLiftsController: BaseApiController
    {
        public MaxLiftsController(IServiceAggregate serviceAggregate) : base(serviceAggregate)
        {
        }

        public HttpResponseMessage Get()
        {
            var userId = User.Identity.GetUserId();
            Func<object> func = () => ServiceAggregate.PersonalRecord.GetMaxEfforts(userId); 
            return ApiGetFunc(func, null);
        }

        public HttpResponseMessage Get(int id)
        {
            var message = string.Format("PR Record with Id {0} was not found.", id);
            Func<object> func = () => ServiceAggregate.PersonalRecord.SingleSimple(e => e.Id == id);
            return ApiGetFunc(func, message);
        }

        public HttpResponseMessage Post(PersonalRecord pr)
        {
            pr.UserId = User.Identity.GetUserId();
            return ApiSaveFunc(ServiceAggregate.PersonalRecord.Create, pr);
        }

        public HttpResponseMessage Put(PersonalRecord pr)
        {
            pr.UserId = User.Identity.GetUserId();
            return ApiSaveFunc(ServiceAggregate.PersonalRecord.Update, pr);
        }

        public HttpResponseMessage Delete(int id)
        {
            Func<bool> func = () => ServiceAggregate.PersonalRecord.Delete(d => d.Id == id);
            return ApiDeleteFunc(func);
        }
    }
}
