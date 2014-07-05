using Diggity.Repository;

namespace Diggity.Rules
{
    public abstract class ValidationBase
    {
        protected readonly IRepositoryAggregate RepositoryAggregate;

        protected ValidationBase(IRepositoryAggregate repositoryAggregate)
        {
            RepositoryAggregate = repositoryAggregate;
        }
    }
}