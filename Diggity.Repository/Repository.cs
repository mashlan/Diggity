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
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : DiggityEntity
    {
        private readonly DbContext Context;
        private readonly DbSet<TEntity> DataSet;

        public Repository(DbContext context)
        {
            Context = context;
            DataSet = context.Set<TEntity>();
        }

        public TEntity GetById(int id)
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

        public TEntity Single(Expression<Func<TEntity, bool>> expression)
        {
            try
            {
                return DataSet.Single(expression);
            }
            catch (Exception ex)
            {
                throw new Exception("Error finding record: " + ex.Message, ex);
            }
        }

        public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> expression)
        {
            try
            {
                return DataSet.Where(expression);
            }
            catch (Exception ex)
            {
                throw new Exception("Error finding records: " + ex.Message, ex);
            }
        }

        public void Create(TEntity entity)
        {
            DataSet.Add(entity);
            SaveChanges();
        }

        public void Update(TEntity entity)
        {
            if (!DataSet.Local.Contains(entity)) DataSet.Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
            SaveChanges();
        }

        public bool Delete(Expression<Func<TEntity, bool>> expression)
        {
            var results = DataSet.Where(expression);
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

        public void AttachChildren<TChildCollection>(TEntity entity, IEnumerable<TChildCollection> children) where TChildCollection: class
        {
            if(!DataSet.Local.Contains(entity)) DataSet.Attach(entity);
            foreach (var child in children) Context.Set<TChildCollection>().Attach(child);
        }

        public void DetatchChildren<TChildCollection>(TEntity entity, IEnumerable<TChildCollection> children) where TChildCollection : class
        {
            if(!DataSet.Local.Contains(entity)) DataSet.Attach(entity);
            var childSet = Context.Set<TChildCollection>();
            foreach (var child in children)
            {
                if (!childSet.Contains(child)) childSet.Attach(child);
                Context.Entry(child).State = EntityState.Modified;
            }

        }
        
        public IEnumerable<TEntity> GetAll()
        {
            try
            {
                DataSet.AsNoTracking();
                var data = DataSet.Where(f => true);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception("Error getting records: " + ex.Message, ex);
            }
        }
    }
}