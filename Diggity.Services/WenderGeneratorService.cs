using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class WenderGeneratorService : ServiceBase<Workout>, IWendlerGeneratorService
    {
        public WenderGeneratorService(IRepositoryAggregate repositoryAggregate, IRepository<Workout> repository, IValidator<Workout> 
            validator) : base(repositoryAggregate, repository, validator)
        {
        }
    }
}