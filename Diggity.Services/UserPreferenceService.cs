using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class UserPreferenceService : ServiceBase<UserPreference>
    {
        public UserPreferenceService(IRepositoryAggregate repositoryAggregate, IRepository<UserPreference> repository, IValidator<UserPreference> validator) 
            : base(repositoryAggregate, repository, validator)
        {
        }
    }
}