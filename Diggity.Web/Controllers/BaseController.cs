using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Diggity.Repository;
using Diggity.Services;

namespace Diggity.Web.Controllers
{
    public class BaseController : Controller
    {
        protected readonly IServiceAggregate ServiceAggregate;

        public BaseController(IServiceAggregate serviceAggregate)
        {
            ServiceAggregate = serviceAggregate;
        }
    }
}