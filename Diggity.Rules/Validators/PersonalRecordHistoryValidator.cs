using Diggity.Entities;
using Diggity.Repository;
using Diggity.Rules.Specifications;

namespace Diggity.Rules.Validators
{
    public class PersonalRecordHistoryValidator : ValidationBase<PersonalRecord>
    {
        public PersonalRecordHistoryValidator(IRepositoryAggregate repositoryAggregate) : base(repositoryAggregate)
        {
        }

        public override bool IsValid(PersonalRecord entity)
        {
            var unique = new PersonalRecordMustBeUnique(RepositoryAggregate.PersonalRecordHistory);
            var future = new PersonalRecordCannotBeInTheFuture();

            return unique.And(future).IsSatisfiedBy(entity);
        }
    }
}