using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class PersonalRecordService : ServiceBase<PersonalRecord>
    {
        public PersonalRecordService(IRepositoryAggregate repositoryAggregate, IRepository<PersonalRecord> repository, IValidator<PersonalRecord> validator) 
            : base(repositoryAggregate, repository, validator)
        {
        }

        public override IEnumerable<object> FindSimple(Expression<Func<PersonalRecord, bool>> expression)
        {
            var entities = Repository.Find(expression).GroupBy(g => g.ExerciseId);
            return GetGroupedObject(entities);
        }

        public override object SingleSimple(Expression<Func<PersonalRecord, bool>> expression)
        {
            var entity = base.Single(expression);
            return GetObject(entity);
        }

        private static IEnumerable<object> GetGroupedObject(IEnumerable<IGrouping<int,PersonalRecord>> records)
        {
            var list = new List<object>();
            foreach (var record in records)
            {
                list.Add(new
                {
                    ExerciseId = record.Key,
                    History = record.Select(GetObject)
                });
            }
            return list;
        }

        private static object GetObject(PersonalRecord entity)
        {
            return new
            {
                entity.Id,
                entity.Value,
                ExerciseName = entity.Exercise.Name,
                RecordDate = entity.RecordDate.ToShortDateString(),
                UnitsName = entity.UnitOfMeasure.Name,
                entity.ExerciseId,
                entity.UnitOfMeasureId
            };
        }
    }
}