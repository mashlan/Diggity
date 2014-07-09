using Diggity.Entities;
using Diggity.Validation;

namespace Diggity.Rules.UnitOfMeasure
{
    public  class NameCannotBeNull : BaseSpecification<IUnitOfMeasure>, ISpecification<IUnitOfMeasure>
    {
        private const string PROPERTY_NAME = "Name";
        private const string RULE_DESC = "Unit of Measure Name cannot be empty";

        public bool IsSatisfiedBy(IUnitOfMeasure entity)
        {
            entity.IsValid = !string.IsNullOrWhiteSpace(entity.Name);
            if(!entity.IsValid) SetFailedRule(entity, PROPERTY_NAME, RULE_DESC);
            return entity.IsValid;
        }
    }
}
