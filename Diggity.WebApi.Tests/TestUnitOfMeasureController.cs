﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Hosting;
using Diggity.Entities;
using Diggity.Repository;
using Diggity.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Diggity.WebApi.Tests
{
    [TestClass]
    public class TestUnitOfMeasureController
    {

        private UnitOfMeasureController controller;
        private readonly Mock<IService<IUnitOfMeasure>> unitOfMeasureService = new Mock<IService<IUnitOfMeasure>>();
        private readonly Mock<IServiceAggregate> serviceAggregate = new Mock<IServiceAggregate>();
        private readonly List<UnitOfMeasure> unitOfMeasures = new List<UnitOfMeasure>();
        
        [TestInitialize]
        public void init()
        {
           //create list of units to check
            for (var i = 0; i < 10; i++)
                unitOfMeasures.Add(new UnitOfMeasure
                {
                    Id = i,
                    Name = "Name " + i,
                    Description = "Test Unit " + i
                });

            unitOfMeasureService.Setup(s => s.GetAll()).Returns(unitOfMeasures);
            serviceAggregate.Setup(s => s.UnitOfMeasure).Returns(unitOfMeasureService.Object);
            controller = new UnitOfMeasureController(serviceAggregate.Object);
            controller.Request = new HttpRequestMessage();
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
            unitOfMeasureService.Setup(s => s.GetById(id)).Returns(unitOfMeasures.Single(u => u.Id == id));

            var response = controller.Get(id);
            Assert.IsNotNull(response);
            Assert.IsTrue(response.StatusCode == HttpStatusCode.OK);
            Assert.IsNotNull(response.Content);

            var test = response.Content.ReadAsAsync(typeof(IUnitOfMeasure));
            var unit = test.Result as UnitOfMeasure;
        }

        [TestMethod]
        public void GetUnitOfMeasureFail()
        {
            const int id = 11;
            unitOfMeasureService.Setup(s => s.GetById(id)).Throws(new Exception("oops"));

            var response = controller.Get(id);
            Assert.IsNotNull(response);
            Assert.IsTrue(response.StatusCode == HttpStatusCode.InternalServerError);
            Assert.IsNotNull(response.Content);

            var test = response.Content.ReadAsAsync(typeof(HttpError));
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

            var test = response.Content.ReadAsAsync(typeof(HttpError));
            var unit = test.Result as HttpError;
            Assert.IsTrue(unit.Message == "Unit Of Measure with Id 11 was not found.");
        }
    }
}