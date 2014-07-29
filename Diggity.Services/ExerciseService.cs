using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class ExerciseService : ServiceBase<Exercise>
    {
        public ExerciseService(IRepositoryAggregate repositoryAggregate, IRepository<Exercise> repository, IValidator<Exercise> validator) 
            : base(repositoryAggregate, repository, validator)
        {
        }

        public override IEnumerable<object> GetAllSimple()
        {
            var data = Repository.GetAll();
            return new List<object>(data.Select(GetSimpleObject));
        }

        public override object SingleSimple(Expression<Func<Exercise, bool>> expression)
        {
            var result = base.Single(expression);
            return GetSimpleObject(result);
        }

        private static object GetSimpleObject(Exercise ex)
        {
            return new
            {
                ex.Name,
                ex.Abbreviation,
                ex.Description,
                ExerciseTypeName = ex.ExerciseType.Name,
                ex.ExerciseTypeId,
                ex.Id
            };
        }
    }
}