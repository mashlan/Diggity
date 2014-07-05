using Diggity.Entities;
using Diggity.Repository;
using Diggity.Rules.Specifications;
using Diggity.Validation;

namespace Diggity.Rules.Validators
{
    public class ExerciseValidator : ValidationBase, IValidator<IExercise>
    {
        public ExerciseValidator(IRepositoryAggregate repositoryAggregate) : base(repositoryAggregate)
        {
        }

        public bool IsValid(IExercise entity)
        {
            var typeCheck = new ExerciseTypeMustBeSet();
            var nameCheck = new ExerciseNameCannotBeNull();
            var uniqueNameCheck = new ExerciseMustBeUnique(RepositoryAggregate.Exercise);

            return typeCheck.And(nameCheck).And(uniqueNameCheck).IsSatisfiedBy(entity);
        }
    }
}
