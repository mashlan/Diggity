namespace Diggity.Entities
{
    public partial class UnitOfMeasure : IUnitOfMeasure
    {
        IExerciseType IUnitOfMeasure.ExerciseType
        {
            get { return ExerciseType; }
            set { ExerciseType = value as ExerciseType; }
        }
    }
}