using Diggity.Entities;
using Diggity.Validation;

namespace Diggity.Rules
{
    internal class ExerciseNameCannotBeNull : BaseSpecification<IExercise>, ISpecification<IExercise>
    {
        private const string PROPERTY_NAME = "Name";
        private const string RULE_DESC = "Exercise Name cannot be empty";

        public bool IsSatisfiedBy(IExercise entity)
        {
            entity.IsValid = !string.IsNullOrWhiteSpace(entity.Name);
            if (!entity.IsValid) SetFailedRule(entity, PROPERTY_NAME, RULE_DESC);
            return entity.IsValid;
        }
    }
}