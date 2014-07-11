using System;
using System.Linq;
using System.Reflection;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Rules
{
    public class ValidationFactory : IValidationFactory
    {
        public IValidator<TEntity> GetValidator<TEntity>(IRepositoryAggregate repositoryAggregate)
            where TEntity : DiggityEntity
        {
            var assembly = Assembly.GetAssembly(typeof(ValidationBase<>));
            var validator = assembly.GetTypes().FirstOrDefault(typeof(ValidationBase<TEntity>).IsAssignableFrom);

            return validator != null
                ? (IValidator<TEntity>) Activator.CreateInstance(validator, repositoryAggregate)
                : null;
        }
    }
}