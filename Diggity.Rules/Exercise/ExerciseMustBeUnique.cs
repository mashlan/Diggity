using System.Linq;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Rules
{
    internal class ExerciseMustBeUnique : BaseSpecification<IExercise>, ISpecification<IExercise>
    {
        private readonly IRepository<IExercise> repository;

        public ExerciseMustBeUnique(IRepository<IExercise> repository)
        {
            this.repository = repository;
        }

        public bool IsSatisfiedBy(IExercise entity)
        {
            var dubs = repository.Find(e => e.Name == entity.Name);
            return !dubs.Any();
        }
    }
}