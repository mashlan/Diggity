using Diggity.Entities;
using Diggity.Repository;

namespace Diggity.Rules.Validators
{
    public class UnitOfMeasureValidator : ValidationBase<UnitOfMeasure>
    {
        public UnitOfMeasureValidator(IRepositoryAggregate repositoryAggregate) : base(repositoryAggregate)
        {
        }

        public override bool IsValid(UnitOfMeasure entity)
        {
            var nameCheck = new NameCannotBeNull();
            return nameCheck.IsSatisfiedBy(entity);
        }
    }
}