using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Diggity.Repository
{
    public interface IRepository<TInterface>
    {
        TInterface GetById(int id);
        TInterface Single(Expression<Func<TInterface, bool>> expression);
        IEnumerable<TInterface> Find(Expression<Func<TInterface, bool>> expression);
        void Create(TInterface entity);
        void Update(TInterface entity);
        bool Delete(TInterface entity);

        bool SaveChanges();
        void RefreshFromDatabase();
        
    }
}
