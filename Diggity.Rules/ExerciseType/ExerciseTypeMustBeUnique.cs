using System.Linq;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Rules
{
    public class ExerciseTypeMustBeUnique : BaseSpecification<ExerciseType>, ISpecification<ExerciseType>
    {
        private readonly IRepository<ExerciseType> repository;

        public ExerciseTypeMustBeUnique(IRepository<ExerciseType> repository)
        {
            this.repository = repository;
        }

        public bool IsSatisfiedBy(ExerciseType entity)
        {
            var dubs = repository.Find(e => e.Id != entity.Id && e.Name.ToLower().Replace(" ", "") == entity.Name.ToLower().Replace(" ", ""));
            return !dubs.Any();
        }
    }
}