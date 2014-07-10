using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Rules
{
    public class ValidationBase<TEntity> : IValidator<TEntity> where TEntity : DiggityEntity
    {
        protected readonly IRepositoryAggregate RepositoryAggregate;

        public ValidationBase(IRepositoryAggregate repositoryAggregate)
        {
            RepositoryAggregate = repositoryAggregate;
        }

        public virtual bool IsValid(TEntity entity)
        {
            return true;
        }
    }
}