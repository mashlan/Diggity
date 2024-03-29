using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class UnitOfMeasureService : ServiceBase<UnitOfMeasure>
    {
        public UnitOfMeasureService(IRepositoryAggregate repositoryAggregate, IRepository<UnitOfMeasure> repository, IValidator<UnitOfMeasure> validator)
            : base(repositoryAggregate, repository, validator)
        {
        }

        public override IEnumerable<object> GetAllSimple()
        {
            var data = Repository.GetAll();
            return new List<object>(data.Select(GetSimpleObject));
        }

        public override object SingleSimple(Expression<Func<UnitOfMeasure, bool>> expression)
        {
            var result = base.Single(expression);
            return GetSimpleObject(result);
        }

        private static object GetSimpleObject(UnitOfMeasure unit)
        {
            return new
            {
                unit.Id,
                unit.Description,
                unit.Name,
                unit.IsValid,
                unit.ValidationErrors
            };
        }
    }
}