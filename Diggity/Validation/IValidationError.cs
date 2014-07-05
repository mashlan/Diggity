namespace Diggity.Validation
{
    public interface IValidationError
    {
        string PropertyName { get; set; }
        string ErrorMessage { get; set; }
    }
}