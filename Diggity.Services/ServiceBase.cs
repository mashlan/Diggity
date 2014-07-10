using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Diggity.Entities;
using Diggity.Exceptions;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class ServiceBase<TInterface> : IService<TInterface> where TInterface : class, IValidationSummary, IEntity
    {
        protected readonly IRepository<TInterface> Repository;
        protected readonly IRepositoryAggregate RepositoryAggregate;
        protected readonly IValidator<TInterface> Validator;

        public ServiceBase(IRepositoryAggregate repositoryAggregate, IRepository<TInterface> repository, IValidator<TInterface> validator)
        {
            RepositoryAggregate = repositoryAggregate;
            Repository = repository;
            Validator = validator;
        }

        public virtual TInterface GetById(int id)
        {
            return Repository.GetById(id);
        }

        public virtual TInterface Single(Expression<Func<TInterface, bool>> expression)
        {
            return Repository.Single(expression);
        }

        public virtual object SingleSimple(Expression<Func<TInterface, bool>> expression)
        {
            var result = Repository.Single(expression);
            return new {Id = result.Id};
        }

        public virtual IEnumerable<TInterface> Find(Expression<Func<TInterface, bool>> expression)
        {
            return Repository.Find(expression);
        }

        public virtual IEnumerable<object> FindSimple(Expression<Func<TInterface, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public virtual IEnumerable<object> GetAllSimple()
        {
            return Repository.GetAll().Select(s => new { s.Id });
        }

        public virtual IEnumerable<TInterface> GetAll()
        {
            return Repository.GetAll();
        }

        public virtual void Create(TInterface entity)
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

        public virtual void Update(TInterface entity)
        {
            try
            {
                if (!Validator.IsValid(entity)) throw new ValidationException(entity);
                Repository.Update(entity);
            }
            catch (Exception ex)
            {
                throw new Exception("Error Updating record: " + ex.Message, ex);
            }
        }

        public virtual bool Delete(Expression<Func<TInterface, bool>> expression)
        {
            return Repository.Delete(expression);
        }

        public virtual bool Delete(int Id)
        {
            return Repository.Delete(Id);
        }
    }
}