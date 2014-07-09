using System.Collections.Generic;
using Diggity.Validation;

namespace Diggity.Entities
{
    public interface IExerciseType : IValidationSummary, IEntity
    {
        new int Id { get; set; }
        string Name { get; set; }
        string Description { get; set; }

        ICollection<IUnitOfMeasure> UnitOfMeasures { get; set; }
        ICollection<IExercise> Exercises { get; set; }

        new bool IsValid { get; set; }
        new IList<IValidationError> ValidationErrors { get; set; }
    }
}