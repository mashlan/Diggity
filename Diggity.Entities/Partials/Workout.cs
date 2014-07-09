using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace Diggity.Entities
{
    public partial class Workout : BaseEntity, IWorkout
    {
        IUser IWorkout.User
        {
            get { return User; }
            set { User = value as User; }
        }

        ICollection<IWorkoutSet> IWorkout.WorkoutSets
        {
            get { return WorkoutSets.ToList<IWorkoutSet>(); }
            set { WorkoutSets = new Collection<WorkoutSet>(value.Select(s => s as WorkoutSet).ToList()); }
        }
    }
}