using System.Collections.Generic;
using Diggity.Entities;
using Diggity.Interfaces;

namespace Diggity.Services
{
    public interface IExerciseService : IService<Exercise>
    {
        IEnumerable<IWendlerExercise> FindWendlers(string userId);
    }
}