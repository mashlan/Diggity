using Diggity.Entities;
using Diggity.Repository;
using Diggity.Rules.Specifications;

namespace Diggity.Rules.Validators
{
    public class ExerciseValidator : ValidationBase<IExercise>
    {
        public ExerciseValidator(IRepositoryAggregate repositoryAggregate) : base(repositoryAggregate)
        {
        }

        public override bool IsValid(IExercise entity)
        {
            var typeCheck = new ExerciseTypeMustBeSet();
            var nameCheck = new ExerciseNameCannotBeNull();
            var uniqueNameCheck = new ExerciseMustBeUnique(RepositoryAggregate.Exercise);

            return typeCheck.And(nameCheck).And(uniqueNameCheck).IsSatisfiedBy(entity);
        }
    }
}
