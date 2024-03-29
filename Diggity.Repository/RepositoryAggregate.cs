﻿using System.Data.Entity;
using Diggity.Database;
using Diggity.Entities;

namespace Diggity.Repository
{
    public class RepositoryAggregate : IRepositoryAggregate
    {
        private readonly DbContext context;

        private IRepository<Exercise> exercise;
        private IRepository<ExerciseType> exerciseType;
        private IRepository<UnitOfMeasure> unitOfMeasure;
        private IRepository<Workout> workout;
        private IRepository<WorkoutSet> workoutSet;
        private IRepository<UserPreference> userPreference;
        private IRepository<PersonalRecord> personalRecordHistory;

        public RepositoryAggregate(string connectionString)
        {
            context = new ModelContainer(connectionString);
        }

        public IRepository<Exercise> Exercise
        {
            get { return exercise ?? (exercise = new Repository<Exercise>(context)); }
        }

        public IRepository<ExerciseType> ExerciseType
        {
            get { return exerciseType ?? (exerciseType = new Repository<ExerciseType>(context)); }
        }

        public IRepository<UnitOfMeasure> UnitOfMeasure
        {
            get { return unitOfMeasure ?? (unitOfMeasure = new Repository<UnitOfMeasure>(context)); }
        }

        public IRepository<Workout> Workout
        {
            get { return workout ?? (workout = new Repository<Workout>(context)); }
        }

        public IRepository<WorkoutSet> WorkoutSet
        {
            get { return workoutSet ?? (workoutSet = new Repository<WorkoutSet>(context)); }
        }

        public IRepository<UserPreference> UserPreference
        {
            get { return userPreference ?? (userPreference = new Repository<UserPreference>(context)); }
        }

        public IRepository<PersonalRecord> PersonalRecordHistory
        {
            get { return personalRecordHistory ?? (personalRecordHistory = new Repository<PersonalRecord>(context)); }
        }
    }
}