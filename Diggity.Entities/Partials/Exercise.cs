namespace Diggity.Entities
{
    public partial class Exercise : BaseEntity, IExercise
    {
        IExerciseType IExercise.ExerciseType
        {
            get { return ExerciseType; }
            set { ExerciseType = value as ExerciseType; }
        }
    }
}