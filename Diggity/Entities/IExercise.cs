using System.Collections.Generic;
using Diggity.Validation;

namespace Diggity.Entities
{
    public interface IExercise : IValidationSummary
    {
        int Id { get; set; }
        string Name { get; set; }
        string Abbreviation { get; set; }
        string Description { get; set; }
        int ExerciseTypeId { get; set; }

        IExerciseType ExerciseType { get; set; }

        new bool IsValid { get; set; }
        new IList<IValidationError> ValidationErrors { get; set; }
    }    
}
