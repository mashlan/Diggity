using System.Configuration;
using System.Data.Entity.Core.EntityClient;
using Diggity.Database;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Rules;
using Diggity.Services;
using Diggity.SQLExpress;
using Diggity.Validation;
using Diggity.WebApi;
using StructureMap;

namespace Diggity.IOC
{
    public class IOCConfiguration
    {
        public static void Configure()
        {
            ObjectFactory.Configure(init =>
            {
                init.Scan(scan =>
                {
                    scan.AssemblyContainingType<BaseApiController>();
                    scan.AssemblyContainingType<Exercise>();
                    scan.AssemblyContainingType<ServiceAggregate>();
                    scan.AssemblyContainingType<ValidationFactory>();
                    scan.AssemblyContainingType<ModelContainer>();
                    scan.AssemblyContainingType<RepositoryAggregate>();
                    scan.AssemblyContainingType<Exercise>();
                    scan.ConnectImplementationsToTypesClosing(typeof (IService<>));
                    scan.ConnectImplementationsToTypesClosing(typeof (IRepository<>));
                    scan.ConnectImplementationsToTypesClosing(typeof (IValidator<>));
                    scan.WithDefaultConventions();
                });
                init.For<IRepositoryAggregate>()
                    .Use<RepositoryAggregate>()
                    .Ctor<string>("connectionString")
                    .Is(GetConnectionString(ConfigurationManager.ConnectionStrings["ModelContainer"].ConnectionString));
                init.For<IServiceAggregate>().Use<ServiceAggregate>();
            });
        }

        private static string GetConnectionString(string connectionString)
        {
            var test = new EntityConnectionStringBuilder(connectionString)
            {
                Metadata = string.Format(
                    "res://{0}/Model.csdl|res://{0}/Model.ssdl|res://{0}/Model.msl",
                    typeof (DiggitySQLExpress).Assembly.FullName)
            };

            return test.ToString();
        }
    }
}