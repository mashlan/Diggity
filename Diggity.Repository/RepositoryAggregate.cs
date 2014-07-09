using System.Data.Entity;
using Diggity.Database;
using Diggity.Entities;

namespace Diggity.Repository
{
    public class RepositoryAggregate : IRepositoryAggregate
    {
        private readonly DbContext context;

        private IRepository<IExercise> exercise;
        private IRepository<IExerciseType> exerciseType;
        private IRepository<IUnitOfMeasure> unitOfMeasure;
        private IRepository<IUser> user;
        private IRepository<IWorkout> workout;
        private IRepository<IWorkoutSet> workoutSet;

        public RepositoryAggregate(string connectionString)
        {
            context = new ModelContainer(connectionString);
        }

        public IRepository<IExercise> Exercise
        {
            get { return exercise ?? (exercise = new Repository<Exercise, IExercise>(context)); }
        }

        public IRepository<IExerciseType> ExerciseType
        {
            get { return exerciseType ?? (exerciseType = new Repository<ExerciseType, IExerciseType>(context)); }
        }

        public IRepository<IUnitOfMeasure> UnitOfMeasure
        {
            get { return unitOfMeasure ?? (unitOfMeasure = new Repository<UnitOfMeasure, IUnitOfMeasure>(context)); }
        }

        public IRepository<IUser> User
        {
            get { return user ?? (user = new Repository<User, IUser>(context)); }
        }

        public IRepository<IWorkout> Workout
        {
            get { return workout ?? (workout = new Repository<Workout, IWorkout>(context)); }
        }

        public IRepository<IWorkoutSet> WorkoutSet
        {
            get { return workoutSet ?? (workoutSet = new Repository<WorkoutSet, IWorkoutSet>(context)); }
        }
    }
}