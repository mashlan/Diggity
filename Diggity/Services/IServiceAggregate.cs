using Diggity.Entities;

namespace Diggity.Services
{
    public interface IServiceAggregate
    {
        IService<Exercise> Exercise { get; }
        IService<ExerciseType> ExerciseType { get; }
        IService<UnitOfMeasure> UnitOfMeasure { get; }
        IService<User> User { get; }
        IService<Workout> Workout { get; }
        IService<WorkoutSet> WorkoutSet { get; }
    }
}