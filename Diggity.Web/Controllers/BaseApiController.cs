using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Diggity.Services;

namespace Diggity.Web.Controllers
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
