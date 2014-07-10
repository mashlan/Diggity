using Diggity.Entities;

namespace Diggity.Repository
{
    public interface IRepositoryAggregate
    {
        IRepository<Exercise> Exercise { get; }
        IRepository<ExerciseType> ExerciseType { get; }
        IRepository<UnitOfMeasure> UnitOfMeasure { get; }
        IRepository<User> User { get; }
        IRepository<Workout> Workout { get; }
        IRepository<WorkoutSet> WorkoutSet { get; }
    }
}