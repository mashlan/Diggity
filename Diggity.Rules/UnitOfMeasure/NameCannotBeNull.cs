using Diggity.Entities;
using Diggity.Validation;

namespace Diggity.Rules
{
    public class NameCannotBeNull : BaseSpecification<UnitOfMeasure>, ISpecification<UnitOfMeasure>
    {
        private const string PROPERTY_NAME = "Name";
        private const string RULE_DESC = "Unit of Measure Name cannot be empty";

        public bool IsSatisfiedBy(UnitOfMeasure entity)
        {
            entity.IsValid = !string.IsNullOrWhiteSpace(entity.Name);
            if(!entity.IsValid) SetFailedRule(entity, PROPERTY_NAME, RULE_DESC);
            return entity.IsValid;
        }
    }
}
