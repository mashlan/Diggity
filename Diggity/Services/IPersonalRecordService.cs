using System.Collections.Generic;
using Diggity.Entities;

namespace Diggity.Services
{
    public interface IPersonalRecordService : IService<PersonalRecord>
    {
        IEnumerable<object> GetMaxEfforts(string userId);
    }
}