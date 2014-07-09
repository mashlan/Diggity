using System.Web.Mvc;
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