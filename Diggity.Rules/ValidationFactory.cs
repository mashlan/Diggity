using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Rules
{
    public class ValidationFactory : IValidationFactory
    {
        public IValidator<TInterface> GetValidator<TInterface>(IRepositoryAggregate repositoryAggregate)
            where TInterface : IValidationSummary
        {
            return new ValidationBase<TInterface>(repositoryAggregate);
        }
    }
}