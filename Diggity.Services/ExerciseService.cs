using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Diggity.Entities;
using Diggity.Interfaces;
using Diggity.Models;
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

        public IEnumerable<IWendlerExercise> FindWendlers(string userId)
        {
            var exercises = Repository.Find(e => e.WendlerGroupId != null).OrderBy(o => o.WendlerGroupId).ToList();
            var exerciseIds = exercises.Select(s => s.Id).ToList();
            var prRecords = RepositoryAggregate.PersonalRecordHistory.Find(
                pr => pr.UserId == userId && exerciseIds.Contains(pr.ExerciseId))
                .GroupBy(g => g.ExerciseId)
                .Select(s => s.Single(w => w.RecordDate == s.Max(m => m.RecordDate))).ToList();

            var wendlers = exercises
                .Select(s => s.ConvertToModel<Exercise, WendlerExercise, IWendlerExercise>(new WendlerExercise()))
                .ToList();


            foreach (var wendler in wendlers)
            {
                var exerciseId = wendler.ExerciseId;
                var pr = prRecords.FirstOrDefault(f => f.ExerciseId == exerciseId);
                if (pr == null) continue;
                wendler.MaxEffort = pr.Value;
                wendler.TrainingWeight = Math.Round(pr.Value*.9);
                wendler.MaxEffortDate = pr.RecordDate;
                wendler.UnitOfMeasureId = pr.UnitOfMeasureId;
                wendler.UnitOfMeasureName = pr.UnitOfMeasure.Name;
            }

            return wendlers;

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