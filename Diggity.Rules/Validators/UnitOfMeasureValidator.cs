using Diggity.Entities;
using Diggity.Repository;
using Diggity.Rules.UnitOfMeasure;

namespace Diggity.Rules.Validators
{
    public class UnitOfMeasureValidator : ValidationBase<IUnitOfMeasure>
    {
        public UnitOfMeasureValidator(IRepositoryAggregate repositoryAggregate) : base(repositoryAggregate)
        {
        }

        public override bool IsValid(IUnitOfMeasure entity)
        {
            var nameCheck = new NameCannotBeNull();
            return nameCheck.IsSatisfiedBy(entity);
        }
    }
}