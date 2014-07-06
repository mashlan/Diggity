using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Diggity.Repository;
using Diggity.Services;

namespace Diggity.Web.Controllers
{
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
