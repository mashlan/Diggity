using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace Diggity.Repository
{
    public class Repository<TEntity, TInterface> : IRepository<TInterface> where TEntity: class, TInterface
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
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }

        public void Update(TInterface entity)
        {
            throw new NotImplementedException();
        }

        public bool Delete(TInterface entity)
        {
            throw new NotImplementedException();
        }

        public bool SaveChanges()
        {
            throw new NotImplementedException();
        }

        public void RefreshFromDatabase()
        {
            throw new NotImplementedException();
        }
    }
}
