using Diggity.Entities;

namespace Diggity.Validation
{
    public interface IValidator<TEntity> where TEntity : DiggityEntity
    {
        bool IsValid(TEntity entity);
    }
}