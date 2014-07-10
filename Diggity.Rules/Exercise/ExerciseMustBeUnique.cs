using System.Linq;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Rules
{
    internal class ExerciseMustBeUnique : BaseSpecification<Exercise>, ISpecification<Exercise>
    {
        private readonly IRepository<Exercise> repository;

        public ExerciseMustBeUnique(IRepository<Exercise> repository)
        {
            this.repository = repository;
        }

        public bool IsSatisfiedBy(Exercise entity)
        {
            var dubs = repository.Find(e => e.Name == entity.Name);
            return !dubs.Any();
        }
    }
}