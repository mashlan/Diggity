using System.Collections.Generic;
using Diggity.Entities;

namespace Diggity.Services
{
    public interface IExerciseService : IService<Exercise>
    {
        IEnumerable<object> FindWendlers(string userId);
    }
}