using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Diggity.Exceptions;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class ServiceBase<TInterface> : IService<TInterface> where TInterface : class, IValidationSummary
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

        public virtual IEnumerable<TInterface> Find(Expression<Func<TInterface, bool>> expression)
        {
            return Repository.Find(expression);
        }

        public virtual IEnumerable<object> GetAll()
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