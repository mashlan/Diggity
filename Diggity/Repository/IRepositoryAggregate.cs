using Diggity.Entities;

namespace Diggity.Repository
{
    public interface IRepositoryAggregate
    {
        IRepository<IExercise> Exercise { get; }
        IRepository<IExerciseType> ExerciseType { get; }
        IRepository<IUnitOfMeasure> UnitOfMeasure { get; }
        IRepository<IUser> User { get; }
        IRepository<IWorkout> Workout { get; }
        IRepository<IWorkoutSet> WorkoutSet { get; }
    }
}
