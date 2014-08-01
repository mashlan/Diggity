using System;
using System.Net.Http;
using Diggity.Entities;
using Diggity.Services;
using Microsoft.AspNet.Identity;

namespace Diggity.WebApi
{
    public class PersonalRecordController : BaseApiController
    {
        public PersonalRecordController(IServiceAggregate serviceAggregate) : base(serviceAggregate)
        {
        }

        public HttpResponseMessage Get()
        {
            var userId = User.Identity.GetUserId();
            Func<object> func =() => ServiceAggregate.PersonalRecordHistory.FindSimple(pr => pr.AspNetUserId == userId);
            return ApiGetFunc(func, null);
        }

        public HttpResponseMessage Get(int id)
        {
            var message = string.Format("PR Record with Id {0} was not found.", id);
            Func<object> func = () => ServiceAggregate.PersonalRecordHistory.SingleSimple(e => e.Id == id);
            return ApiGetFunc(func, message);
        }

        public HttpResponseMessage Post(PersonalRecord pr)
        {
            pr.AspNetUserId = User.Identity.GetUserId();
            return ApiSaveFunc(ServiceAggregate.PersonalRecordHistory.Create, pr);
        }

        public HttpResponseMessage Put(PersonalRecord pr)
        {
            pr.AspNetUserId = User.Identity.GetUserId();
            return ApiSaveFunc(ServiceAggregate.PersonalRecordHistory.Update, pr);
        }

        public HttpResponseMessage Delete(int id)
        {
            Func<bool> func = () => ServiceAggregate.PersonalRecordHistory.Delete(d => d.Id == id);
            return ApiDeleteFunc(func);
        }
    }
}