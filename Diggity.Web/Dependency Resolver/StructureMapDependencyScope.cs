using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Dependencies;
using Microsoft.Practices.ServiceLocation;
using StructureMap;

namespace Diggity.Web
{
    public class StructureMapDependencyScope : ServiceLocatorImplBase, IDependencyScope
    {
        protected readonly IContainer Container;

        public StructureMapDependencyScope(IContainer container)
        {
            if (container == null)
            {
                throw new ArgumentNullException("container");
            }

            Container = container;
        }

        public void Dispose()
        {
            Container.Dispose();
        }

        public new object GetService(Type serviceType)
        {
            if (serviceType == null) return null;
            
            try
            {
                return serviceType.IsAbstract || serviceType.IsInterface
                    ? Container.TryGetInstance(serviceType)
                    : Container.GetInstance(serviceType);
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return Container.GetAllInstances(serviceType).Cast<object>();
        }

        protected override IEnumerable<object> DoGetAllInstances(Type serviceType)
        {
            return Container.GetAllInstances(serviceType).Cast<object>();
        }

        protected override object DoGetInstance(Type serviceType, string key)
        {
            if (string.IsNullOrEmpty(key))
            {
                return serviceType.IsAbstract || serviceType.IsInterface
                    ? Container.TryGetInstance(serviceType)
                    : Container.GetInstance(serviceType);
            }

            return Container.GetInstance(serviceType, key);
        }
    }
}