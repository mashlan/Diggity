using System.Collections.Generic;
using Diggity.Validation;

namespace Diggity.Entities
{
    public interface IWorkout : IValidationSummary
    {
        int Id { get; set; }
        string Name { get; set; }
        string Description { get; set; }
        string StartDateTime { get; set; }
        string EndDateTime { get; set; }
        int UserId { get; set; }

        IUser User { get; set; }
        ICollection<IWorkoutSet> WorkoutSets { get; set; }

        new bool IsValid { get; set; }
        new IList<IValidationError> ValidationErrors { get; set; }
    }
}