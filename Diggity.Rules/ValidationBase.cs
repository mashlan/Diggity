using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Rules
{
    public class ValidationBase<TInterface>: IValidator<TInterface> where TInterface : IValidationSummary
    {
        protected readonly IRepositoryAggregate RepositoryAggregate;

        public ValidationBase(IRepositoryAggregate repositoryAggregate)
        {
            RepositoryAggregate = repositoryAggregate;
        }

        public virtual bool IsValid(TInterface entity)
        {
            return true;
        }
    }
}