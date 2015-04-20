using Diggity.Entities;

namespace Diggity.Services
{
    public interface IServiceAggregate
    {
        IExerciseService Exercise { get; }
        IService<ExerciseType> ExerciseType { get; }
        IService<UnitOfMeasure> UnitOfMeasure { get; }
        IService<Workout> Workout { get; }
        IService<WorkoutSet> WorkoutSet { get; }
        IService<UserPreference> UserPreference { get; }
        IPersonalRecordService PersonalRecord { get; } 
    }
}