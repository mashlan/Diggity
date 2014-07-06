using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace Diggity.Entities
{
    public partial class User : BaseEntity, IUser
    {
        ICollection<IWorkout> IUser.Workouts
        {
            get { return Workouts.ToList<IWorkout>(); }
            set { Workouts = new Collection<Workout>(value.Select(s => s as Workout).ToList());}
        }
    }
}