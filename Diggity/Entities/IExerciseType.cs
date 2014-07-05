using System.Collections.Generic;

namespace Diggity.Entities
{
    public interface IExerciseType
    {
        int Id { get; set; }
        string Name { get; set; }
        string Description { get; set; }
        bool IsUserPreference { get; set; }

        ICollection<IUnitOfMeasure> UnitOfMeasures { get; set; }
        ICollection<IExercise> Exercises { get; set; }
    }
}
