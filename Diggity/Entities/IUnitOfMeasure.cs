using System.Collections.Generic;
using Diggity.Validation;

namespace Diggity.Entities
{
    public interface IUnitOfMeasure : IValidationSummary
    {
        int Id { get; set; }
        string Name { get; set; }
        string Description { get; set; }


        new bool IsValid { get; set; }
        new IList<IValidationError> ValidationErrors { get; set; }
    }
}
