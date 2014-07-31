using Diggity.Entities;
using Diggity.Repository;

namespace Diggity.Rules.Validators
{
    public class UserPreferenceValidator : ValidationBase<UserPreference>
    {
        public UserPreferenceValidator(IRepositoryAggregate repositoryAggregate) : base(repositoryAggregate)
        {
        }
    }
}