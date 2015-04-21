using System;

namespace Diggity.Interfaces
{
    public interface IWendlerExercise 
    {
        int ExerciseId { get; set; }
        int WendlerGroupId { get; set; }
        string ExerciseName { get; set; }
        double MaxEffort { get; set; }
        double TrainingWeight { get; set; }
        DateTime? MaxEffortDate { get; set; }
        int UnitOfMeasureId { get; set; }
        string UnitOfMeasureName { get; set; }
    }
}