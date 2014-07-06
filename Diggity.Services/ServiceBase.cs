using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Diggity.Entities;
using Diggity.Exceptions;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class ServiceBase<TInterface>: IService<TInterface> where TInterface: class , IValidationSummary
    {
        private readonly IRepositoryAggregate RepositoryAggregate;
        private readonly IRepository<TInterface> Repository;
        private readonly IValidator<TInterface> Validator;

        public ServiceBase(IRepositoryAggregate repositoryAggregate, IRepository<TInterface> repository, IValidator<TInterface> validator  )
        {
            RepositoryAggregate = repositoryAggregate;
            Repository = repository;
            Validator = validator;
        }

        public TInterface GetById(int id)
        {
            return Repository.GetById(id);
        }

        public TInterface Single(Expression<Func<TInterface, bool>> expression)
        {
            return Repository.Single(expression);
        }

        public IEnumerable<TInterface> Find(Expression<Func<TInterface, bool>> expression)
        {
            return Repository.Find(expression);
        }

        public void Create(TInterface entity)
        {
            try
            {
                if (!Validator.IsValid(entity)) throw new ValidationException(entity);
                Repository.Create(entity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error Creating record: " + ex.Message, ex);
            }
        }

        public void Update(TInterface entity)
        {
            Repository.Update(entity);
        }

        public bool Delete(TInterface entity)
        {
            return Repository.Delete(entity);
        }
    }

    //public class ExerciseService : ServiceBase<IExercise>
    //{
    //    public ExerciseService(IRepositoryAggregate repositoryAggregate, IRepository<IExercise> repository, IValidator<IExercise> validator)
    //        : base(repositoryAggregate, repository, validator)
    //    {
    //    }
    //}

    //public class ExerciseTypeService : ServiceBase<IExerciseType>
    //{
    //    public ExerciseTypeService(IRepositoryAggregate repositoryAggregate, IRepository<IExerciseType> repository, IValidator<IExerciseType> validator) :
    //        base(repositoryAggregate, repository, validator)
    //    {
    //    }
    //}
}
