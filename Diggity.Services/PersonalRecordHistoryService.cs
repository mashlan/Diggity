using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class PersonalRecordHistoryService : ServiceBase<PersonalRecord>
    {
        public PersonalRecordHistoryService(IRepositoryAggregate repositoryAggregate, IRepository<PersonalRecord> repository, IValidator<PersonalRecord> validator) 
            : base(repositoryAggregate, repository, validator)
        {
        }
    }
}