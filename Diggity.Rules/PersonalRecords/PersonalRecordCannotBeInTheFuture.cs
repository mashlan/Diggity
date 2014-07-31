using System;
using Diggity.Entities;
using Diggity.Validation;

namespace Diggity.Rules
{
    public class PersonalRecordCannotBeInTheFuture : BaseSpecification<PersonalRecord>, ISpecification<PersonalRecord>
    {
        private const string PROPERTY_NAME = "Record Date";
        private const string RULE_DESC = "Cannot record a Personal Record in the future.";
        
        public bool IsSatisfiedBy(PersonalRecord entity)
        {
            var valid = entity.RecordDate < DateTime.Now;
            if(!valid) SetFailedRule(entity, PROPERTY_NAME, RULE_DESC);
            return valid;
        }
    }
}