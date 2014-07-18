using System.Web.Mvc;
using Diggity.Services;

namespace Diggity.Web.Controllers
{
    [RequireHttps]
    public class HomeController : BaseController
    {
        public HomeController(IServiceAggregate serviceAggregate)
            : base(serviceAggregate)
        {
        }

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}