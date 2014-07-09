using System.Collections.Generic;

namespace Diggity.Validation
{
    public interface IValidationSummary
    {
        bool IsValid { get; set; }
        IList<IValidationError> ValidationErrors { get; set; }
    }
}