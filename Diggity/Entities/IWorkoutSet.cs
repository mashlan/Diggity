using System.Collections.Generic;
using Diggity.Validation;

namespace Diggity.Entities
{
    public interface IWorkoutSet : IValidationSummary, IEntity
    {
        new int Id { get; set; }
        string SortOrder { get; set; }
        string PlannedReps { get; set; }
        string ActualReps { get; set; }
        string PlannedWeight { get; set; }
        string ActualWeight { get; set; }
        int UnitOfMeasureId { get; set; }
        int ExerciseId { get; set; }
        int WorkoutId { get; set; }

        IUnitOfMeasure UnitOfMeasure { get; set; }
        IExercise Exercise { get; set; }
        IWorkout Workout { get; set; }

        new bool IsValid { get; set; }
        new IList<IValidationError> ValidationErrors { get; set; }
    }
}