using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class ExerciseTypeService : ServiceBase<ExerciseType>
    {
        public ExerciseTypeService(IRepositoryAggregate repositoryAggregate, IRepository<ExerciseType> repository, IValidator<ExerciseType> validator) 
            : base(repositoryAggregate, repository, validator)
        {
        }

        public override IEnumerable<object> GetAllSimple()
        {
            var data = Repository.GetAll();
            return new List<object>(data.Select(
                a =>
                    new
                    {
                        a.Id,
                        a.Description,
                        a.Name,
                        UnitOfMeasures = a.UnitOfMeasures.Select(u => new {u.Id, u.Name})
                    }));

        }

        public override object SingleSimple(Expression<Func<ExerciseType, bool>> expression)
        {
            var data = Repository.Single(expression);
            return new
            {
                data.Id,
                data.Description,
                data.Name,
                UnitOfMeasures = data.UnitOfMeasures.Select(u => new {u.Id, u.Name})
            };
        }

        public override void Create(ExerciseType entity)
        {
            Repository.AttachChildren(entity, entity.UnitOfMeasures);
            base.Create(entity);
        }

        public override void Update(ExerciseType entity)
        {
            //get the database exercise type, and associated units
            var ex = Repository.Single(e => e.Id == entity.Id);
            var units = ex.UnitOfMeasures.ToList();

            //add the units 
            var addedUnits = entity.UnitOfMeasures.Where(s => !units.Select(u => u.Id).Contains(s.Id)).ToList();
            Repository.AttachChildren(ex, addedUnits);
            foreach (var add in addedUnits) ex.UnitOfMeasures.Add(add);
            
            //remove the deleted units
            var deletedUnits = units.Where(u => !entity.UnitOfMeasures.Select(s => s.Id).Contains(u.Id));
            foreach (var del in deletedUnits) ex.UnitOfMeasures.Remove(del);

            //update the database entity
            ex.Name = entity.Name;
            ex.Description = entity.Description;
            
            //update entity
            base.Update(ex);
        }
    }
}