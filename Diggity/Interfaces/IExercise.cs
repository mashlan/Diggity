namespace Diggity.Interfaces
{
    public interface IExercise
    {
        int Id { get; set; }
        string Name { get; set; }
        string Abbreviation { get; set; }
        string Description { get; set; }
        int ExerciseTypeId { get; set; }
        int? WendlerGroupId { get; set; }
    }
}
