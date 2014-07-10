using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Diggity.Repository
{
    public interface IRepository<TEntity>
    {
        TEntity GetById(int id);
        IEnumerable<TEntity> GetAll();
        TEntity Single(Expression<Func<TEntity, bool>> expression);
        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> expression);
        void Create(TEntity entity);
        void Update(TEntity entity);
        bool Delete(Expression<Func<TEntity, bool>> expression);
        bool Delete(int Id);
    }
}