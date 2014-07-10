using System;
using System.Collections.Generic;
using Diggity.Entities;
using Diggity.Validation;

namespace Diggity.Exceptions
{
    public class ValidationException : Exception
    {
        public ValidationException(DiggityEntity entity)
        {
            ValidationErrors = entity.ValidationErrors;
        }

        public IList<ValidationError> ValidationErrors { get; private set; }
    }
}