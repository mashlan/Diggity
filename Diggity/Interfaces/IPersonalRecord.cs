using System;

namespace Diggity.Interfaces
{
    public interface IPersonalRecord
    {
        int Id { get; set; }
        DateTime RecordDate { get; set; }
        double Value { get; set; }
        int UnitOfMeasureId { get; set; }
        int ExerciseId { get; set; }
        string UserId { get; set; }
    }
}