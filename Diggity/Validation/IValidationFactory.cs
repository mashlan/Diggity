using Diggity.Entities;
using Diggity.Repository;

namespace Diggity.Validation
{
    public interface IValidationFactory
    {
        IValidator<TEntity> GetValidator<TEntity>(IRepositoryAggregate repositoryAggregate)
            where TEntity : DiggityEntity;
    }
}