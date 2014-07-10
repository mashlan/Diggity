using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class ExerciseTypeService : ServiceBase<ExerciseType>
    {
        public ExerciseTypeService(IRepositoryAggregate repositoryAggregate, IRepository<ExerciseType> repository, IValidator<ExerciseType> validator) 
            : base(repositoryAggregate, repository, validator)
        {
        }

        public override IEnumerable<object> GetAllSimple()
        {
            var data = Repository.GetAll();
            return new List<object>(data.Select(
                a =>
                    new
                    {
                        a.Id,
                        a.Description,
                        a.Name,
                        UnitOfMeasures = a.UnitOfMeasures.Select(u => new {u.Id, u.Name})
                    }));

        }

        public override object SingleSimple(Expression<Func<ExerciseType, bool>> expression)
        {
            var data = Repository.Single(expression);
            return new
            {
                data.Id,
                data.Description,
                data.Name,
                UnitOfMeasures = data.UnitOfMeasures.Select(u => new {u.Id, u.Name})
            };
        }
    }
}