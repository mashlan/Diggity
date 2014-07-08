using System.Web.Http;
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
    }
}
