using System.Collections.Generic;
using Diggity.Validation;

namespace Diggity.Rules
{
    public class ValidationSummary : IValidationSummary
    {
        public bool IsValid { get; set; }
        public IList<IValidationError> ValidationErrors { get; set; }
    }
}