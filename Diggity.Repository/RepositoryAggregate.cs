using System.Data.Entity;
using Diggity.Entities;

namespace Diggity.Repository
{
    public class RepositoryAggregate : IRepositoryAggregate
    {
        private readonly DbContext context;
        public RepositoryAggregate(DbContext context)
        {
            this.context = context;
        }

        private IRepository<IExercise> exercise;
        private IRepository<IExerciseType> exerciseType;
        private IRepository<IUnitOfMeasure> unitOfMeasure;

        public IRepository<IExercise> Exercise
        {
            get { return exercise ?? (exercise = new Repository<Exercise,IExercise>(context)); }
        }

        public IRepository<IExerciseType> ExerciseType
        {
            get { return exerciseType ?? (exerciseType = new Repository<ExerciseType,IExerciseType>(context)); }
        }

        public IRepository<IUnitOfMeasure> UnitOfMeasure
        {
            get { return unitOfMeasure ?? (unitOfMeasure = new Repository<UnitOfMeasure, IUnitOfMeasure>(context)); }
        }
    }
}
