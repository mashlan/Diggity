using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Rules.Validators;
using Diggity.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Diggity.Rules.Tests
{
    [TestClass]
    public class ExerciseRulesTests
    {
        private Mock<IRepositoryAggregate> repositoryAggregate = new Mock<IRepositoryAggregate>();
        private ExerciseValidator rule; 
        private IList<Exercise> exerciseList = new List<Exercise>();

        [TestInitialize]
        public void init()
        {
            for(var i = 0; i < 10; i++)
                exerciseList.Add(new Exercise
                {
                    Id = i,
                    Name = "Exercise " + i,
                    Abbreviation = i.ToString() + i,
                    ExerciseTypeId = i + 5
                });
            repositoryAggregate = new Mock<IRepositoryAggregate>();
            repositoryAggregate.Setup(s => s.Exercise).Returns(new Mock<IRepository<IExercise>>().Object);
            
            rule = new ExerciseValidator(repositoryAggregate.Object);
            
        }

        [TestMethod]
        public void TestRulesPass()
        {
            repositoryAggregate.Setup(s => s.Exercise.Find(It.IsAny<Expression<Func<IExercise, bool>>>())).Returns(new List<Exercise>());

            var exercise = new Exercise
            {
                Id = 1,
                Name = "Bench Press", //name is not null
                Abbreviation = "44",
                ExerciseTypeId = 5 //exercise type must be set
            };

            var valid = rule.IsValid(exercise);
            Assert.IsTrue(valid);
        }

        [TestMethod]
        public void TestNameIsNotNullPass()
        {
            var exercise = new Exercise
            {
                Id = 1,
                Name = "Bench Press", //name is not null
                Abbreviation = "44",
                ExerciseTypeId = 5 //exercise type must be set
            };

            var valid = rule.IsValid(exercise);
            Assert.IsTrue(valid);
        }

        [TestMethod]
        public void TestNameIsNotNullFail()
        {
            var exercise = new Exercise
            {
                Id = 1,
                Name = "", //name  cannot be null
                Abbreviation = "44",
                ExerciseTypeId = 5 //exercise type must be set
            };

            bool valid = rule.IsValid(exercise);
            Assert.IsFalse(valid);
            Assert.IsNotNull(exercise.ValidationErrors);
            Assert.IsTrue(exercise.ValidationErrors[0].PropertyName == "Name");
        }
    }
}