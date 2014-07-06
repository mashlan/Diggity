namespace Diggity.Entities
{
    public partial class WorkoutSet : BaseEntity, IWorkoutSet
    {
        IUnitOfMeasure IWorkoutSet.UnitOfMeasure
        {
            get { return UnitOfMeasure; }
            set { UnitOfMeasure = value as UnitOfMeasure; }
        }

        IExercise IWorkoutSet.Exercise
        {
            get { return Exercise; }
            set { Exercise = value as Exercise; }
        }

        IWorkout IWorkoutSet.Workout
        {
            get { return Workout; }
            set { Workout = value as Workout; }
        }
    }
}