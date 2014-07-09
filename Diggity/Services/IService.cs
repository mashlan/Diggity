using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Diggity.Services
{
    public interface IService<TInterface>
    {
        TInterface GetById(int id);
        TInterface Single(Expression<Func<TInterface, bool>> expression);
        IEnumerable<TInterface> Find(Expression<Func<TInterface, bool>> expression);
        IEnumerable<TInterface> GetAll();
        void Create(TInterface entity);
        void Update(TInterface entity);
        bool Delete(Expression<Func<TInterface, bool>> expression);
        bool Delete(int Id);
    }
}