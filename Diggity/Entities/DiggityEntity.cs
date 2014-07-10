using System.Collections.Generic;
using Diggity.Validation;

namespace Diggity.Entities
{
    public abstract class DiggityEntity 
    {
        public bool IsValid { get; set; }
        public IList<ValidationError> ValidationErrors { get; set; }
    }
}
