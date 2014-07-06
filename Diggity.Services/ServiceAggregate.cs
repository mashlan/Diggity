using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class ServiceAggregate : IServiceAggregate
    {
        private readonly IRepositoryAggregate repositoryAggregate;
        private readonly IValidationFactory validationFactory;

        public ServiceAggregate(IRepositoryAggregate repositoryAggregate, IValidationFactory validationFactory)
        {
            this.repositoryAggregate = repositoryAggregate;
            this.validationFactory = validationFactory;
        }

        private IService<IExercise> exercise;
        private IService<IExerciseType> exerciseType;
        private IService<IUnitOfMeasure> unitOfMeasure;
        private IService<IUser> user;
        private IService<IWorkout> workout;
        private IService<IWorkoutSet> workoutSet;

        public IService<IExercise> Exercise
        {
            get
            {
                return exercise ??
                       (exercise = new ServiceBase<IExercise>(repositoryAggregate, repositoryAggregate.Exercise,
                           validationFactory.GetValidator<IExercise>(repositoryAggregate)));
            }
        }

        public IService<IExerciseType> ExerciseType
        {
            get
            {
                return exerciseType ??
                       (exerciseType =
                           new ServiceBase<IExerciseType>(repositoryAggregate, repositoryAggregate.ExerciseType,
                               validationFactory.GetValidator<IExerciseType>(repositoryAggregate)));
            }
        }

        public IService<IUnitOfMeasure> UnitOfMeasure
        {
            get
            {
                return unitOfMeasure ??
                       (unitOfMeasure =
                           new ServiceBase<IUnitOfMeasure>(repositoryAggregate, repositoryAggregate.UnitOfMeasure,
                               validationFactory.GetValidator<IUnitOfMeasure>(repositoryAggregate)));
            }
        }

        public IService<IUser> User
        {
            get
            {
                return user ?? (user = new ServiceBase<IUser>(repositoryAggregate, repositoryAggregate.User,
                    validationFactory.GetValidator<IUser>(repositoryAggregate)));
            }
        }

        public IService<IWorkout> Workout
        {
            get
            {
                return workout ?? (workout = new ServiceBase<IWorkout>(repositoryAggregate, repositoryAggregate.Workout,
                    validationFactory.GetValidator<IWorkout>(repositoryAggregate)));
            }
        }

        public IService<IWorkoutSet> WorkoutSet
        {
            get
            {
                return workoutSet ??
                       (workoutSet = new ServiceBase<IWorkoutSet>(repositoryAggregate, repositoryAggregate.WorkoutSet,
                           validationFactory.GetValidator<IWorkoutSet>(repositoryAggregate)));
            }
        }
    }
}