using Diggity.Entities;
using Diggity.Repository;

namespace Diggity.Rules.Validators
{
    public class WorkoutValidator : ValidationBase<Workout> {
        public WorkoutValidator(IRepositoryAggregate repositoryAggregate) : base(repositoryAggregate)
        {
        }

        public override bool IsValid(Workout entity)
        {
            return true;
        }
    }
}