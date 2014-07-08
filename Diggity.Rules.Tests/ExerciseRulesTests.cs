using System.Configuration;
using System.Data.Entity.Core.EntityClient;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Rules.Validators;
using Diggity.SQLExpress;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Diggity.Rules.Tests
{
    [TestClass]
    public class ExerciseRulesTests
    {
        private IRepositoryAggregate repositoryAggregate;

        [TestInitialize]
        public void init()
        {
            repositoryAggregate = new RepositoryAggregate(GetConnectionString(ConfigurationManager.ConnectionStrings["ModelContainer"].ConnectionString));
        }

        private static string GetConnectionString(string connectionString)
        {
            var test = new EntityConnectionStringBuilder(connectionString)
            {
                Metadata = string.Format(
                    "res://{0}/Model.csdl|res://{0}/Model.ssdl|res://{0}/Model.msl",
                    typeof(DiggitySQLExpress).Assembly.FullName)
            };

            return test.ToString();
        }

        [TestMethod]
        public void TestRulesPass()
        {
            var rule = new ExerciseValidator(repositoryAggregate);
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
            var rule = new ExerciseValidator(repositoryAggregate);

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
            var rule = new ExerciseValidator(repositoryAggregate);

            var exercise = new Exercise
            {
                Id = 1,
                Name = "", //name  cannot be null
                Abbreviation = "44",
                ExerciseTypeId = 5 //exercise type must be set
            };

            var valid = rule.IsValid(exercise);
            Assert.IsFalse(valid);
            Assert.IsNotNull(exercise.ValidationErrors);
            Assert.IsTrue(exercise.ValidationErrors[0].PropertyName == "Name");
        }
    }
}
