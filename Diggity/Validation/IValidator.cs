namespace Diggity.Validation
{
    public interface IValidator<TEntity> where TEntity : IValidationSummary
    {
        bool IsValid(TEntity entity);
    }
}