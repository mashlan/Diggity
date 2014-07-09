using System;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;
using StructureMap;

namespace Diggity.Web
{
    public class StructureMapHttpControllerActivator : IHttpControllerActivator
    {
        private readonly IContainer container;

        public StructureMapHttpControllerActivator(IContainer container)
        {
            this.container = container;
        }

        public IHttpController Create(
            HttpRequestMessage request,
            HttpControllerDescriptor controllerDescriptor,
            Type controllerType)
        {
            return (IHttpController) container.GetInstance(controllerType);
        }
    }
}