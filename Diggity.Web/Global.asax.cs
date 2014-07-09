using System;
using System.Web;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Diggity.IOC;
using StructureMap;

namespace Diggity.Web
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            IOCConfiguration.Configure();
            ControllerBuilder.Current.SetControllerFactory(new DiggityControllerFactory());
            GlobalConfiguration.Configuration.Services.Replace(typeof (IHttpControllerActivator), new StructureMapHttpControllerActivator(ObjectFactory.Container));
            
            DependencyResolver.SetResolver(new StructureMapDependencyResolver(ObjectFactory.Container));
            GlobalConfiguration.Configuration.DependencyResolver =  new StructureMapDependencyResolver(ObjectFactory.Container);
        }
        
        protected void Application_EndRequest(object sender, EventArgs e)
        {
           
        }   
    }
}