using System.Collections.Generic;
using System.Linq;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class UnitOfMeasureService : ServiceBase<IUnitOfMeasure>
    {
        public UnitOfMeasureService(IRepositoryAggregate repositoryAggregate, IRepository<IUnitOfMeasure> repository, IValidator<IUnitOfMeasure> validator) 
            : base(repositoryAggregate, repository, validator)
        {
        }

        public override IEnumerable<object> GetAll()
        {
            var data = Repository.GetAll().ToArray();

            var list = new object[data.Count()];
            for (var i = 0; i < data.Count(); i++)
            {
                list[i] = new
                {
                    data[i].Description,
                    data[i].Name,
                    data[i].Id
                };
            }

            return list;
        }
    }
}