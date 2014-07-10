using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Diggity.Services
{
    public interface IService<TEntity>
    {
        TEntity GetById(int id);
        TEntity Single(Expression<Func<TEntity, bool>> expression);
        object SingleSimple(Expression<Func<TEntity, bool>> expression);
        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> expression);
        IEnumerable<object> FindSimple(Expression<Func<TEntity, bool>> expression);
        IEnumerable<object> GetAllSimple();
        IEnumerable<TEntity> GetAll(); 
        void Create(TEntity entity);
        void Update(TEntity entity);
        bool Delete(Expression<Func<TEntity, bool>> expression);
        bool Delete(int Id);
    }
}