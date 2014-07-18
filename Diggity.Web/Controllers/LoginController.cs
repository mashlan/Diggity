using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Diggity.Services;

namespace Diggity.Web.Controllers
{
    public class LoginController : BaseController
    {
        // GET: Login
        public LoginController(IServiceAggregate serviceAggregate) : base(serviceAggregate)
        {
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}