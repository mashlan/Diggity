using System;
using System.Collections.Generic;
using System.Linq;
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

        public string Errors
        {
            get
            {
                return ValidationErrors.Select(s => s.ErrorMessage).Aggregate((current, next) => current + "/n" + next);
            }
        }
    }
}