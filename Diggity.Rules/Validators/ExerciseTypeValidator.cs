using Diggity.Entities;
using Diggity.Repository;

namespace Diggity.Rules.Validators
{
    public class ExerciseTypeValidator : ValidationBase<ExerciseType>
    {
        public ExerciseTypeValidator(IRepositoryAggregate repositoryAggregate) : base(repositoryAggregate)
        {
        }

        public override bool IsValid(ExerciseType entity)
        {
            var uniqueCheck = new ExerciseTypeMustBeUnique(RepositoryAggregate.ExerciseType);
            return uniqueCheck.IsSatisfiedBy(entity);
        }
    }
}