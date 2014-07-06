namespace Diggity.Entities
{
    public partial class UnitOfMeasure : BaseEntity, IUnitOfMeasure
    {
        IExerciseType IUnitOfMeasure.ExerciseType
        {
            get { return ExerciseType; }
            set { ExerciseType = value as ExerciseType; }
        }
    }
}