using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class WendlerExerciseService : ServiceBase<Exercise>, IWendlerExerciseService
    {
        public WendlerExerciseService(IRepositoryAggregate repositoryAggregate, IRepository<Exercise> repository,
            IValidator<Exercise> validator) : base(repositoryAggregate, repository, validator)
        {
        }
    }
}