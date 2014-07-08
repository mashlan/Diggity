using System.Collections.Generic;
using Diggity.Validation;

namespace Diggity.Entities
{
    public interface IUser : IValidationSummary, IEntity
    {
        new int Id { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        string Email { get; set; }

        ICollection<IWorkout> Workouts { get; set; }

        new bool IsValid { get; set; }
        new IList<IValidationError> ValidationErrors { get; set; }
    }
}