using Diggity.Repository;

namespace Diggity.Validation
{
    public interface IValidationFactory
    {
        IValidator<TInterface> GetValidator<TInterface>(IRepositoryAggregate repositoryAggregate)
            where TInterface : IValidationSummary;
    }
}