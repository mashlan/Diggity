using System.Collections.Generic;
using Diggity.Validation;

namespace Diggity.Entities
{
    public partial class Exercise : IExercise
    {
        IExerciseType IExercise.ExerciseType
        {
            get { return ExerciseType; } 
            set { ExerciseType = value as ExerciseType; }
        }

        public bool IsValid { get; set; }
        public IList<IValidationError> ValidationErrors { get; set; }
    }
}
