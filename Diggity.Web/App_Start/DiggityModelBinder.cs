using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Web.Mvc;
using System.Web.Routing;
using StructureMap;

namespace Diggity.Web
{
    public class DiggityControllerFactory : DefaultControllerFactory
    {
        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            if (controllerType == null) return null;

            try
            {
                return ObjectFactory.GetInstance(controllerType) as Controller;
            }
            catch (StructureMapException)
            {
                Debug.WriteLine("oops");
                throw;
            }
        }
    }

    
}