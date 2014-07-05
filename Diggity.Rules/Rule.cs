using Diggity.Validation;

namespace Diggity.Rules
{
    public class Rule : IValidationError
    {
        public string PropertyName { get; set; }
        public string ErrorMessage { get; set; }
    }
}