﻿using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class ServiceAggregate : IServiceAggregate
    {
        private readonly IRepositoryAggregate repositoryAggregate;
        private readonly IValidationFactory validationFactory;

        private IService<Exercise> exercise;
        private IService<ExerciseType> exerciseType;
        private IService<UnitOfMeasure> unitOfMeasure;
        private IService<User> user;
        private IService<Workout> workout;
        private IService<WorkoutSet> workoutSet;

        public ServiceAggregate(IRepositoryAggregate repositoryAggregate, IValidationFactory validationFactory)
        {
            this.repositoryAggregate = repositoryAggregate;
            this.validationFactory = validationFactory;
        }

        public IService<Exercise> Exercise
        {
            get
            {
                return exercise ??
                       (exercise = new ServiceBase<Exercise>(repositoryAggregate, repositoryAggregate.Exercise,
                           validationFactory.GetValidator<Exercise>(repositoryAggregate)));
            }
        }

        public IService<ExerciseType> ExerciseType
        {
            get
            {
                return exerciseType ??
                       (exerciseType =
                           new ServiceBase<ExerciseType>(repositoryAggregate, repositoryAggregate.ExerciseType,
                               validationFactory.GetValidator<ExerciseType>(repositoryAggregate)));
            }
        }

        public IService<UnitOfMeasure> UnitOfMeasure
        {
            get
            {
                return unitOfMeasure ??
                       (unitOfMeasure =
                           new UnitOfMeasureService(repositoryAggregate, repositoryAggregate.UnitOfMeasure,
                               validationFactory.GetValidator<UnitOfMeasure>(repositoryAggregate)));
            }
        }

        public IService<User> User
        {
            get
            {
                return user ?? (user = new ServiceBase<User>(repositoryAggregate, repositoryAggregate.User,
                    validationFactory.GetValidator<User>(repositoryAggregate)));
            }
        }

        public IService<Workout> Workout
        {
            get
            {
                return workout ?? (workout = new ServiceBase<Workout>(repositoryAggregate, repositoryAggregate.Workout,
                    validationFactory.GetValidator<Workout>(repositoryAggregate)));
            }
        }

        public IService<WorkoutSet> WorkoutSet
        {
            get
            {
                return workoutSet ??
                       (workoutSet = new ServiceBase<WorkoutSet>(repositoryAggregate, repositoryAggregate.WorkoutSet,
                           validationFactory.GetValidator<WorkoutSet>(repositoryAggregate)));
            }
        }
    }
}