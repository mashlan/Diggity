using System;
using System.Net;
using System.Net.Http;
using Diggity.Entities;
using Diggity.Exceptions;
using Diggity.Services;

namespace Diggity.WebApi
{
    public class ExerciseTypeController : BaseApiController
    {
        public ExerciseTypeController(IServiceAggregate serviceAggregate)
            : base(serviceAggregate)
        {
        }

        public HttpResponseMessage Get()
        {
            try
            {
                var results = ServiceAggregate.ExerciseType.GetAll();
                return Request.CreateResponse(HttpStatusCode.OK, results);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        // GET: api/UnitOfMeasure/5
        public HttpResponseMessage Get(int id)
        {
            try
            {
                var result = ServiceAggregate.ExerciseType.Single(u => u.Id == id);
                if (result != null) return Request.CreateResponse(HttpStatusCode.OK, result);

                var message = string.Format("Unit Of Measure with Id {0} was not found.", id);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        // POST: api/UnitOfMeasure
        public HttpResponseMessage Post(IExerciseType exerciseType)
        {
            try
            {
                ServiceAggregate.ExerciseType.Create(exerciseType);
                return Request.CreateResponse(HttpStatusCode.OK, "success");
            }
            catch (ValidationException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        // PUT: api/UnitOfMeasure/5
        public HttpResponseMessage Put(IExerciseType exerciseType)
        {
            try
            {
                ServiceAggregate.ExerciseType.Update(exerciseType);
                return Request.CreateResponse(HttpStatusCode.OK, "success");
            }
            catch (ValidationException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        // DELETE: api/UnitOfMeasure/5
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                ServiceAggregate.ExerciseType.Delete(d => d.Id == id);
                return Request.CreateResponse(HttpStatusCode.OK, "success");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}