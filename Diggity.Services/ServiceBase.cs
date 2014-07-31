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
    public class ServiceBase<TEntity> : IService<TEntity> where TEntity : DiggityEntity
    {
        protected readonly IRepository<TEntity> Repository;
        protected readonly IRepositoryAggregate RepositoryAggregate;
        protected readonly IValidator<TEntity> Validator;

        public ServiceBase(IRepositoryAggregate repositoryAggregate, IRepository<TEntity> repository, IValidator<TEntity> validator)
        {
            RepositoryAggregate = repositoryAggregate;
            Repository = repository;
            Validator = validator;
        }

        public virtual TEntity GetById(int id)
        {
            return Repository.GetById(id);
        }

        public virtual TEntity Single(Expression<Func<TEntity, bool>> expression)
        {
            return Repository.Single(expression);
        }

        public virtual object SingleSimple(Expression<Func<TEntity, bool>> expression)
        {
            var result = Repository.Single(expression);
            return new {result};
        }

        public virtual IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> expression)
        {
            return Repository.Find(expression);
        }

        public virtual IEnumerable<object> FindSimple(Expression<Func<TEntity, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public virtual IEnumerable<object> GetAllSimple()
        {
            return Repository.GetAll().Select(s => new { s.IsValid });
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            return Repository.GetAll();
        }

        public virtual void Create(TEntity entity)
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

        public virtual void Update(TEntity entity)
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

        public virtual bool Delete(Expression<Func<TEntity, bool>> expression)
        {
            return Repository.Delete(expression);
        }
    }
}