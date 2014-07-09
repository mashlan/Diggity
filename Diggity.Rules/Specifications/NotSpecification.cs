using System;
using Diggity.Validation;

namespace Diggity.Rules.Specifications
{
    internal class NotSpecification<TEntity> : ISpecification<TEntity>
    {
        internal NotSpecification(ISpecification<TEntity> spec)
        {
            if (spec == null) throw new ArgumentNullException("spec");
            Wrapped = spec;
        }

        private ISpecification<TEntity> Wrapped { get; set; }

        public bool IsSatisfiedBy(TEntity candidate)
        {
            return !Wrapped.IsSatisfiedBy(candidate);
        }
    }
}