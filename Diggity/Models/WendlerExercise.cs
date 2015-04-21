using System;
using Diggity.Interfaces;

namespace Diggity.Models
{
    public class WendlerExercise : DiggityModel, IWendlerExercise
    {
        public int WendlerGroupId { get; set; }
        public string ExerciseName { get; set; }
        public int ExerciseId { get; set; }

        public double MaxEffort { get; set; }
        public double TrainingWeight { get; set; }
        public DateTime? MaxEffortDate { get; set; }
        public int UnitOfMeasureId { get; set; }
        public string UnitOfMeasureName { get; set; }

    }
}
