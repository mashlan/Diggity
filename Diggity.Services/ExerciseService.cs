using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class ExerciseService : ServiceBase<Exercise>, IExerciseService
    {
        public ExerciseService(IRepositoryAggregate repositoryAggregate, IRepository<Exercise> repository, IValidator<Exercise> validator) 
            : base(repositoryAggregate, repository, validator)
        {
        }

        public override IEnumerable<object> GetAllSimple()
        {
            var data = Repository.GetAll().OrderBy(o => o.Name);
            return new List<object>(data.Select(s => GetSimpleObject(s, false)));
        }

        public IEnumerable<object> FindWendlers(string userId)
        {
            var wendlers = Repository.Find(e => e.WendlerGroupId != null).OrderBy(o => o.WendlerGroupId).ToList();
            foreach (var wendler in wendlers)
            {
                var exerciseId = wendler.Id;
                var prs = wendler.PersonalRecordHistories.ToList().Where(
                    pr => pr.UserId == userId && pr.ExerciseId == exerciseId)
                    .GroupBy(g => g.ExerciseId)
                    .Select(s => s.Single(w => w.RecordDate == s.Max(m => m.RecordDate))).ToList();

                wendler.PersonalRecordHistories = prs;
            }

            return new List<object>(wendlers.Select(s => GetSimpleObject(s, true)));

        }

        public override object SingleSimple(Expression<Func<Exercise, bool>> expression)
        {
            var result = base.Single(expression);
            return GetSimpleObject(result);
        }

        private static object GetSimpleObject(Exercise ex, bool showPr = false)
        {
            return new
            {
                ex.Name,
                ex.Abbreviation,
                ex.Description,
                ExerciseTypeName = ex.ExerciseType.Name,
                ex.ExerciseTypeId,
                ex.Id,
                ex.WendlerGroupId,
                PersonalRecords = showPr
                    ? ex.PersonalRecordHistories.Select(s => new
                    {
                        RecordDate = s.RecordDate.ToShortDateString(),
                        s.Value,
                        s.UnitOfMeasureId
                    }).ToList()
                    : null
            };
        }
    }
}