using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Diggity.Entities;

namespace Diggity.Services
{
    public interface IPersonalRecordService : IService<PersonalRecord>
    {
        IEnumerable<object> GetMaxEfforts(string userId);
        IEnumerable<PersonalRecord> FindMostRecent(Expression<Func<PersonalRecord, bool>> expression );
    }
}