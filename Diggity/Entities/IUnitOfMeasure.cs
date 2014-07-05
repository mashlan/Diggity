namespace Diggity.Entities
{
    public interface IUnitOfMeasure
    {
        int Id { get; set; }
        string Name { get; set; }
        string Description { get; set; }
        int ExerciseTypeId { get; set; }

        IExerciseType ExerciseType { get; set; }
    }
}
