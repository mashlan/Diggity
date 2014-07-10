using System.Collections.Generic;
using Diggity.Entities;
using Diggity.Validation;

namespace Diggity.Rules
{
    public abstract class BaseSpecification<TEntity> where TEntity : DiggityEntity
    {
        protected void SetFailedRule(TEntity entity, string propertyName, string rule)
        {
            if (entity.ValidationErrors == null) entity.ValidationErrors = new List<ValidationError>();
            entity.ValidationErrors.Add(new ValidationError
            {
                PropertyName = propertyName,
                ErrorMessage = rule
            });
        }
    }
}