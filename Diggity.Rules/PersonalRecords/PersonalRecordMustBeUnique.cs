using System.Linq;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Rules
{
    public class PersonalRecordMustBeUnique : BaseSpecification<PersonalRecord>, ISpecification<PersonalRecord>
    {
        private const string PROPERTY_NAME = "Personal Record";
        private const string RULE_DESC = "Record must be unique. You have already recorded a PR for this exercise on this date.";

        private readonly IRepository<PersonalRecord> repository;

        public PersonalRecordMustBeUnique(IRepository<PersonalRecord> repository)
        {
            this.repository = repository;
        }

        public bool IsSatisfiedBy(PersonalRecord entity)
        {
            var dups = repository.Find(p =>
                p.ExerciseId == entity.ExerciseId && p.UserId == entity.UserId &&
                p.RecordDate == entity.RecordDate && p.Id != entity.Id);

            var valid = !dups.Any();
            if (!valid) SetFailedRule(entity, PROPERTY_NAME, RULE_DESC);
            return valid;
        }
    }
}