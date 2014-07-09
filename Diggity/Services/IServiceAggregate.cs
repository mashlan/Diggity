using Diggity.Entities;

namespace Diggity.Services
{
    public interface IServiceAggregate
    {
        IService<IExercise> Exercise { get; }
        IService<IExerciseType> ExerciseType { get; }
        IService<IUnitOfMeasure> UnitOfMeasure { get; }
        IService<IUser> User { get; }
        IService<IWorkout> Workout { get; }
        IService<IWorkoutSet> WorkoutSet { get; }
    }
}