using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Hosting;
using Diggity.Entities;
using Diggity.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Diggity.WebApi.Tests
{
    [TestClass]
    public class TestUnitOfMeasureController
    {
        private readonly Mock<IServiceAggregate> serviceAggregate = new Mock<IServiceAggregate>();
        private readonly Mock<IService<UnitOfMeasure>> unitOfMeasureService = new Mock<IService<UnitOfMeasure>>();
        private readonly List<UnitOfMeasure> unitOfMeasures = new List<UnitOfMeasure>();
        private UnitOfMeasureController controller;

        [TestInitialize]
        public void init()
        {
            //create list of units to check
            for (int i = 0; i < 10; i++)
                unitOfMeasures.Add(new UnitOfMeasure
                {
                    Id = i,
                    Name = "Name " + i,
                    Description = "Test Unit " + i
                });

            unitOfMeasureService.Setup(s => s.GetAllSimple()).Returns(unitOfMeasures);
            serviceAggregate.Setup(s => s.UnitOfMeasure).Returns(unitOfMeasureService.Object);
            controller = new UnitOfMeasureController(serviceAggregate.Object) {Request = new HttpRequestMessage()};
            controller.Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());
        }

        [TestMethod]
        public void GetAllUnitOfMeasures()
        {
            var response = controller.Get();

            Assert.IsNotNull(response);
            Assert.IsTrue(response.StatusCode == HttpStatusCode.OK);
            Assert.IsNotNull(response.Content);

            response.Content.ReadAsAsync(typeof (List<UnitOfMeasure>));
        }

        [TestMethod]
        public void GetUnitOfMeasure()
        {
            const int id = 5;
            unitOfMeasureService.Setup(ss => ss.SingleSimple(It.IsAny<Expression<Func<UnitOfMeasure, bool>>>())).Returns(new { Id = "", Description = "" });

            var response = controller.Get(id);
            Assert.IsNotNull(response);
            Assert.IsTrue(response.StatusCode == HttpStatusCode.OK);
            Assert.IsNotNull(response.Content);
        }

        [TestMethod]
        public void GetUnitOfMeasureFail()
        {
            const int id = 11;
            unitOfMeasureService.Setup(ss => ss.SingleSimple(It.IsAny<Expression<Func<UnitOfMeasure, bool>>>())).Throws(new Exception("oops"));

            var response = controller.Get(id);
            Assert.IsNotNull(response);
            Assert.IsTrue(response.StatusCode == HttpStatusCode.InternalServerError);
            Assert.IsNotNull(response.Content);

            var test = response.Content.ReadAsAsync(typeof (HttpError));
            var unit = test.Result as HttpError;
            Assert.IsTrue(unit.Message == "oops");
        }

        [TestMethod]
        public void GetUnitOfMeasureNotFound()
        {
            const int id = 11;
            var response = controller.Get(id);
            Assert.IsNotNull(response);
            Assert.IsTrue(response.StatusCode == HttpStatusCode.NotFound);
            Assert.IsNotNull(response.Content);

            var test = response.Content.ReadAsAsync(typeof (HttpError));
            var unit = test.Result as HttpError;
            Assert.IsTrue(unit.Message == "Unit Of Measure with Id 11 was not found.");
        }
    }
}