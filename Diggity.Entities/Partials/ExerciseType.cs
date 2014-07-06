using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace Diggity.Entities
{
    public partial class ExerciseType : BaseEntity, IExerciseType
    {
        ICollection<IUnitOfMeasure> IExerciseType.UnitOfMeasures
        {
            get { return UnitOfMeasures.ToList<IUnitOfMeasure>(); }
            set { UnitOfMeasures = new Collection<UnitOfMeasure>(value.Select(s => s as UnitOfMeasure).ToList());}
        }

        ICollection<IExercise> IExerciseType.Exercises
        {
            get { return Exercises.ToList<IExercise>(); }
            set { Exercises = new Collection<Exercise>(value.Select(s => s as Exercise).ToList()); }
        }
    }
}