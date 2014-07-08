using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using Diggity.Entities;

namespace Diggity.Repository
{
    public class Repository<TEntity, TInterface> : IRepository<TInterface> where TEntity : class, TInterface, IEntity
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
            return DataSet.Find(id);
        }

        public TInterface Single(Expression<Func<TInterface, bool>> expression)
        {
            return DataSet.Single(Converter.TransformPredicateLambda<TInterface, TEntity>(expression));
        }

        public IEnumerable<TInterface> Find(Expression<Func<TInterface, bool>> expression)
        {
            return DataSet.Where(Converter.TransformPredicateLambda<TInterface, TEntity>(expression));
        }

        public void Create(TInterface entity)
        {
            DataSet.Attach(entity as TEntity);
            SaveChanges();
        }

        public void Update(TInterface entity)
        {
            if (!DataSet.Local.Contains(entity as TEntity)) DataSet.Attach(entity as TEntity);
            SaveChanges();
        }

        public bool Delete(Expression<Func<TInterface, bool>> expression)
        {
            var results = DataSet.Where(Converter.TransformPredicateLambda<TInterface, TEntity>(expression));
            foreach (var result in results)
            {
                DataSet.Remove(result);
            }
            return SaveChanges();
        }

        public bool SaveChanges()
        {
            return Convert.ToBoolean(Context.SaveChanges());
        }

        public void RefreshFromDatabase()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TInterface> GetAll()
        {
            var data = DataSet.Where(f => true);
            return data.ToList();
        }
    }
}
