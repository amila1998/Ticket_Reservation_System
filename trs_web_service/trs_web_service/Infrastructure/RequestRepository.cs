/// Infrastructure/RequestRepository.cs

using MongoDB.Bson;
using MongoDB.Driver;
using trs_web_service.Models.Domains;

namespace trs_web_service.Infrastructure
{
    public class RequestRepository
    {
        private readonly IMongoCollection<Request> _collection;

        public RequestRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<Request>("Requests");
        }

        /// <summary>
        /// Create a request asynchronously.
        /// </summary>
        public async Task CreateRequestAsync(Request req)
        {
            await _collection.InsertOneAsync(req);
        }

        /// <summary>
        /// Get all requests created by a specific user asynchronously.
        /// </summary>
        public async Task<List<Request>> GetAllRequestsByCreatedByAsync(string createdBy)
        {
            var filter = Builders<Request>.Filter.Eq(
                b => b.Booking.CreatedBy, createdBy
            );

            return await _collection.Find(filter).ToListAsync();
        }

        /// <summary>
        /// Get all not accepted requests by agent ID asynchronously.
        /// </summary>
        public async Task<List<Request>> GetAllNotAcceptedRequestsByAgentIDAsync(string agentId)
        {
            var filter = Builders<Request>.Filter.Eq(r => r.AgentId, agentId);
            var sort = Builders<Request>.Sort.Descending(r => r.CreatedAt);

            return await _collection.Find(filter).Sort(sort).ToListAsync();
        }

        /// <summary>
        /// Get a request by its ID asynchronously.
        /// </summary>
        public async Task<Request> GeByIdAsync(ObjectId id)
        {
            return await _collection.Find(t => t.Id == id).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Delete a request asynchronously.
        /// </summary>
        public async Task DeleteReservationAsync(ObjectId requestId)
        {
            var filter = Builders<Request>.Filter.Eq(r => r.Id, requestId);
            await _collection.DeleteOneAsync(filter);
        }

        /// <summary>
        /// Update a request asynchronously.
        /// </summary>
        public async Task UpdateRequestAsync(ObjectId requestId, Request updatedRequest)
        {
            var filter = Builders<Request>.Filter.Eq(r => r.Id, requestId);
            var update = Builders<Request>.Update
                .Set(r => r.Booking, updatedRequest.Booking);

            await _collection.UpdateOneAsync(filter, update);
        }

        /// <summary>
        /// Accept a request asynchronously.
        /// </summary>
        public async Task AcceptRequestAsync(ObjectId requestId)
        {
            var filter = Builders<Request>.Filter.Eq(r => r.Id, requestId);
            var update = Builders<Request>.Update
                .Set(r => r.IsReqAccepted, true);

            await _collection.UpdateOneAsync(filter, update);
        }
    }
}