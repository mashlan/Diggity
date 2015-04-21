using System;
using Diggity.Interfaces;

namespace Diggity.Entities
{
    public partial class Exercise : IExercise, IWendlerExercise
    {
        public int ExerciseId
        {
            get { return Id; }
            set { Id = value; }
        }

        public string ExerciseName
        {
            get { return Name; }
            set { Name = value; }
        }

        int IWendlerExercise.WendlerGroupId
        {
            get { return WendlerGroupId.GetValueOrDefault(0); }
            set { WendlerGroupId = value; }
        }

        public double MaxEffort { get; set; }
        public double TrainingWeight { get; set; }
        public DateTime? MaxEffortDate { get; set; }
        public int UnitOfMeasureId { get; set; }
        public string UnitOfMeasureName { get; set; }
    }
}
