using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Linq.Expressions;
using Diggity.Entities;

namespace Diggity.Repository
{
    public class Repository<TEntity, TInterface> : IRepository<TInterface> where TEntity : class, TInterface, IEntity
        where TInterface : class, IEntity
    {
        private readonly DbContext Context;
        private readonly DbSet<TEntity> DataSet;

        public Repository(DbContext context)
        {
            Context = context;
            DataSet = context.Set<TEntity>();
        }

        public TInterface GetById(int id)
        {
            try
            {
                return DataSet.Find(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error getting record: " + ex.Message, ex);
            }
        }

        public TInterface Single(Expression<Func<TInterface, bool>> expression)
        {
            try
            {
                return DataSet.Single(Converter.TransformPredicateLambda<TInterface, TEntity>(expression));
            }
            catch (Exception ex)
            {
                throw new Exception("Error finding record: " + ex.Message, ex);
            }
        }

        public IEnumerable<TInterface> Find(Expression<Func<TInterface, bool>> expression)
        {
            try
            {
                return DataSet.Where(Converter.TransformPredicateLambda<TInterface, TEntity>(expression));
            }
            catch (Exception ex)
            {
                throw new Exception("Error finding records: " + ex.Message, ex);
            }
        }

        public void Create(TInterface entity)
        {
            DataSet.Add(entity as TEntity);
            SaveChanges();
        }

        public void Update(TInterface entity)
        {
            DataSet.Attach(entity as TEntity);
            Context.Entry(entity).State = EntityState.Modified;
            SaveChanges();
        }

        public bool Delete(Expression<Func<TInterface, bool>> expression)
        {
            var results = DataSet.Where(Converter.TransformPredicateLambda<TInterface, TEntity>(expression));
            foreach (var result in results)  DataSet.Remove(result);
            return SaveChanges();
        }

        private bool SaveChanges()
        {
            try
            {
                return Convert.ToBoolean(Context.SaveChanges());
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw new Exception("Concurrency Error: " + ex.Message, ex);
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("Database Update Error: " + ex.Message, ex);
            }
            catch (DbEntityValidationException dbEx)
            {
                if (!dbEx.EntityValidationErrors.Any()) throw new Exception(dbEx.Message, dbEx);

                var errors = dbEx.EntityValidationErrors.Aggregate(string.Empty, (current1, error)
                    => error.ValidationErrors.Aggregate(current1, (current, msg) => current + msg.ErrorMessage));

                throw new Exception("Entity Validation Errors: " + errors, dbEx);
            }
        }
        
        public IEnumerable<TInterface> GetAll()
        {
            try
            {
                DataSet.AsNoTracking();
                var data = DataSet.Where(f => true);
                return data.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Error gettting records: " + ex.Message, ex);
            }
        }

        public bool Delete(int Id)
        {
            return Delete(d => d.Id == Id);
        }
    }
}