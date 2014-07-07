using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Diggity.Entities;
using Diggity.Services;

namespace Diggity.Web.Controllers
{
    public class UnitOfMeasureController : BaseApiController
    {
        // GET: api/UnitOfMeasure
        public UnitOfMeasureController(IServiceAggregate serviceAggregate) : base(serviceAggregate)
        {
        }

        public IEnumerable<IUnitOfMeasure> Get()
        {
            return ServiceAggregate.UnitOfMeasure.GetAll();
        }

        // GET: api/UnitOfMeasure/5
        public IUnitOfMeasure Get(int id)
        {
            return ServiceAggregate.UnitOfMeasure.Single(u => u.Id == id);
        }

        // POST: api/UnitOfMeasure
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/UnitOfMeasure/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/UnitOfMeasure/5
        public void Delete(int id)
        {
        }
    }
}
