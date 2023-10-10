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
            // Define a filter to match reservations with at least one booking created by the specified user
            var filter = Builders<Request>.Filter.ElemMatch(
                r => r.Bookings,
                b => b.CreatedBy == createdBy
            );

            return await _collection.Find(filter).ToListAsync();
        }

        public async Task<List<Request>> GetAllRequestsByAgentIDAsync(string agentId)
        {
            // Define a filter to match reservations with at least one booking created by the specified user
            var filter = Builders<Request>.Filter.Eq(r => r.AgentId, agentId);
            

            return await _collection.Find(filter).ToListAsync();
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
                .Set(r => r.Bookings, updatedRequest.Bookings);

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
