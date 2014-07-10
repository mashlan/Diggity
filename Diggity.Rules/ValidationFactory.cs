using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Rules
{
    public class ValidationFactory : IValidationFactory
    {
        public IValidator<TEntity> GetValidator<TEntity>(IRepositoryAggregate repositoryAggregate)
            where TEntity : DiggityEntity
        {
            return new ValidationBase<TEntity>(repositoryAggregate);
        }
    }
}