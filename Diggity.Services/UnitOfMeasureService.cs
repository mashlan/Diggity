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
        public UnitOfMeasureService(IRepositoryAggregate repositoryAggregate, IRepository<UnitOfMeasure> repository,
            IValidator<UnitOfMeasure> validator)
            : base(repositoryAggregate, repository, validator)
        {
        }

        public override IEnumerable<object> GetAllSimple()
        {
            var data = Repository.GetAll();
            return new List<object>(data.Select(a => new {a.Name, a.Description, a.Id}));
        }

        public override object SingleSimple(Expression<Func<UnitOfMeasure, bool>> expression)
        {
            var result = base.Single(expression);
            return new
            {
                result.Id,
                result.Description,
                result.Name,
                result.IsValid,
                result.ValidationErrors
            };
        }
    }
}