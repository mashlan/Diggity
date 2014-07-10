using Diggity.Entities;
using Diggity.Validation;

namespace Diggity.Rules
{
    internal class ExerciseTypeMustBeSet : BaseSpecification<Exercise>, ISpecification<Exercise>
    {
        private const string PROPERTY_NAME = "ExerciseTypeId";
        private const string RULE_DESC = "Exercise Type must be set";

        public bool IsSatisfiedBy(Exercise entity)
        {
            entity.IsValid = entity.ExerciseTypeId > 0;
            if (!entity.IsValid) SetFailedRule(entity, PROPERTY_NAME, RULE_DESC);
            return entity.IsValid;
        }
    }
}