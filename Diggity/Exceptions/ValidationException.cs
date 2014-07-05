using System;
using System.Collections.Generic;
using Diggity.Validation;

namespace Diggity.Exceptions
{
    public class ValidationException: Exception
    {
        public IList<IValidationError> ValidationErrors { get; private set; }

        public ValidationException(IValidationSummary validationSummary)
        {
            ValidationErrors = validationSummary.ValidationErrors;
        }
    }
}
