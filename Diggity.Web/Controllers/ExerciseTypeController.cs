using System.Collections.Generic;
using System.Web.Http;
using Diggity.Entities;
using Diggity.Services;

namespace Diggity.Web.Controllers
{
    public class ExerciseTypeController : BaseApiController
    {
        public ExerciseTypeController(IServiceAggregate serviceAggregate) : base(serviceAggregate)
        {
        }

        // GET: api/ExerciseType
        public IEnumerable<IUnitOfMeasure> Get()
        {
            var results = ServiceAggregate.UnitOfMeasure.GetAll();
            return results;
        }

        // GET: api/ExerciseType/5
        public IExerciseType Get(int id)
        {
            return ServiceAggregate.ExerciseType.Single(a => a.Id == id);
        }

        // POST: api/ExerciseType
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ExerciseType/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ExerciseType/5
        public void Delete(int id)
        {
        }
    }
}
