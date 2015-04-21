using System;
using Diggity.Entities;
using Diggity.Interfaces;
using Diggity.Models;
using Diggity.Repository;
using Diggity.Validation;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Diggity.Services.Tests
{
    [TestClass]
    public class WendlerServiceTests
    {
        private readonly IWendlerExerciseService wendlerService;
        private readonly Mock<IRepositoryAggregate> repositoryAggregateMock;
        private readonly Mock<IValidator<Exercise>> exerciseValidatorMock;
        private readonly Mock<IRepository<Exercise>> exerciseRepositoryMock;


        public WendlerServiceTests()
        {
            exerciseValidatorMock = new Mock<IValidator<Exercise>>();
            repositoryAggregateMock = new Mock<IRepositoryAggregate>();
            exerciseRepositoryMock = new Mock<IRepository<Exercise>>();

            wendlerService = new WendlerExerciseService(repositoryAggregateMock.Object, exerciseRepositoryMock.Object,
                exerciseValidatorMock.Object);
        }

        
        [TestMethod]
        public void GetWendlerExercises()
        {
            var exercise = GetExercise();
            var we = exercise.ConvertToModel<Exercise, WendlerExercise, IWendlerExercise>(new WendlerExercise());
            Assert.IsTrue(we.ExerciseId == exercise.Id);
        }

        private Exercise GetExercise()
        {
            return new Exercise
            {
                Id = 1,
                Abbreviation = "BP",
                Description = "This is Bench Press",
                ExerciseTypeId = 5,
                Name = "Bench Press",
                WendlerGroupId = 1
            };
        }

        private PersonalRecord GetPersonalRecord()
        {
            return new PersonalRecord
            {
                Id = 1,
                ExerciseId = 1,
                RecordDate = DateTime.Now,
                Value = 220,
                UnitOfMeasureId = 1,
                UserId = "ericmashlan"
            };
        }
    }
}