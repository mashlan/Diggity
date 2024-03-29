﻿using Diggity.Entities;
using Diggity.Repository;
using Diggity.Validation;

namespace Diggity.Services
{
    public class ServiceAggregate : IServiceAggregate
    {
        private readonly IRepositoryAggregate repositoryAggregate;
        private readonly IValidationFactory validationFactory;

        private IExerciseService exercise;
        private IService<ExerciseType> exerciseType;
        private IService<UnitOfMeasure> unitOfMeasure;
        private IService<Workout> workout;
        private IService<WorkoutSet> workoutSet;
        private IService<UserPreference> userPreference;
        private IPersonalRecordService personalRecordHistory;
        private IWendlerGeneratorService wendlerGenerator;
        private IWendlerExerciseService wendlerExercise;

        public ServiceAggregate(IRepositoryAggregate repositoryAggregate, IValidationFactory validationFactory)
        {
            this.repositoryAggregate = repositoryAggregate;
            this.validationFactory = validationFactory;
        }

        public IExerciseService Exercise
        {
            get
            {
                return exercise ??
                       (exercise = new ExerciseService(repositoryAggregate, repositoryAggregate.Exercise,
                           validationFactory.GetValidator<Exercise>(repositoryAggregate)));
            }
        }

        public IService<ExerciseType> ExerciseType
        {
            get
            {
                return exerciseType ??
                       (exerciseType =
                           new ExerciseTypeService(repositoryAggregate, repositoryAggregate.ExerciseType,
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

        public IService<UserPreference> UserPreference
        {
            get
            {
                return userPreference ??
                       (userPreference =
                           new UserPreferenceService(repositoryAggregate, repositoryAggregate.UserPreference,
                               validationFactory.GetValidator<UserPreference>(repositoryAggregate)));
            }
        }

        public IPersonalRecordService PersonalRecord
        {
            get
            {
                return personalRecordHistory ??
                       (personalRecordHistory =
                           new PersonalRecordService(repositoryAggregate,
                               repositoryAggregate.PersonalRecordHistory,
                               validationFactory.GetValidator<PersonalRecord>(repositoryAggregate)));
            }
        }

        public IWendlerExerciseService WendlerExercise
        {
            get { return wendlerExercise ??(wendlerExercise = new WendlerExerciseService(repositoryAggregate, 
                repositoryAggregate.Exercise, validationFactory.GetValidator<Exercise>(repositoryAggregate))); }
        }

        public IWendlerGeneratorService WendlerGenerator
        {
            get
            {
                return wendlerGenerator ??
                       (wendlerGenerator =
                           new WenderGeneratorService(repositoryAggregate, repositoryAggregate.Workout,
                               validationFactory.GetValidator<Workout>(repositoryAggregate)));
            }
        }
    }
}