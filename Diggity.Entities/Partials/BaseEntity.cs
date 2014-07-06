using System.Collections.Generic;
using Diggity.Validation;

namespace Diggity.Entities
{
    public abstract class BaseEntity : IValidationSummary
    {
        public bool IsValid { get; set; }
        public IList<IValidationError> ValidationErrors { get; set; }
    }
}