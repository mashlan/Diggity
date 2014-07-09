using System.Collections.Generic;
using Diggity.Validation;

namespace Diggity.Rules
{
    public abstract class BaseSpecification<TEntity> where TEntity : IValidationSummary
    {
        protected void SetFailedRule(TEntity entity, string propertyName, string rule)
        {
            if (entity.ValidationErrors == null) entity.ValidationErrors = new List<IValidationError>();
            entity.ValidationErrors.Add(new Rule
            {
                PropertyName = propertyName,
                ErrorMessage = rule
            });
        }
    }
}