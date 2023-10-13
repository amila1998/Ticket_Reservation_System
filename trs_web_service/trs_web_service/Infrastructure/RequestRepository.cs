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

        // Create Request
        public async Task CreateRequestAsync(Request req)
        {
            await _collection.InsertOneAsync(req);
        }

        public async Task<List<Request>> GetAllRequestsByCreatedByAsync(string createdBy)
        {
            // Define a filter to match reservations with at booking created by the specified user
            var filter = Builders<Request>.Filter.Eq(
                b => b.Booking.CreatedBy, createdBy
            );

            return await _collection.Find(filter).ToListAsync();
        }

        public async Task<List<Request>> GetAllNotAcceptedRequestsByAgentIDAsync(string agentId)
        {
            // Define a filter to match reservations with at least one booking created by the specified user
            var filter = Builders<Request>.Filter.Eq(r => r.AgentId, agentId);
            var sort = Builders<Request>.Sort.Descending(r => r.CreatedAt);

            return await _collection.Find(filter).Sort(sort).ToListAsync();
        }

        public async Task<Request> GeByIdAsync(ObjectId id)
        {
            return await _collection.Find(t => t.Id == id).FirstOrDefaultAsync();
        }

        // Delete Request
        public async Task DeleteReservationAsync(ObjectId requestId)
        {
            var filter = Builders<Request>.Filter.Eq(r => r.Id, requestId);
            await _collection.DeleteOneAsync(filter);
        }

        // Update Request
        public async Task UpdateRequestAsync(ObjectId requestId, Request updatedRequest)
        {
            var filter = Builders<Request>.Filter.Eq(r => r.Id, requestId);
            var update = Builders<Request>.Update
                .Set(r => r.Booking, updatedRequest.Booking);

            await _collection.UpdateOneAsync(filter, update);
        }

        // Accept Request
        public async Task AcceptRequestAsync(ObjectId requestId)
        {
            var filter = Builders<Request>.Filter.Eq(r => r.Id, requestId);
            var update = Builders<Request>.Update
                .Set(r => r.IsReqAccepted, true);

            await _collection.UpdateOneAsync(filter, update);
        }


    }
}
