/// Infrastructure/TrainRepository.cs

using MongoDB.Bson;
using MongoDB.Driver;
using trs_web_service.Models.Domains;
using trs_web_service.Models.Dtos;

namespace trs_web_service.Infrastructure
{
    public class TrainRepository
    {
        private readonly IMongoCollection<Train> _collection;

        public TrainRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<Train>("Trains");
        }

        /// <summary>
        /// Create a new train asynchronously.
        /// </summary>
        public async Task CreateAsync(Train train)
        {
            await _collection.InsertOneAsync(train);
        }

        /// <summary>
        /// Retrieve a train by its registration number asynchronously.
        /// </summary>
        public async Task<Train> GetByRegistraionNoAsync(string regNo)
        {
            // Create a filter to find the route with the given start and end stations
            var filter = Builders<Train>.Filter.Eq(x => x.RegistraionNo, regNo) &
                          Builders<Train>.Filter.Eq(x => x.IsDelete, false);

            // Use Find method to search for the route
            Train train = await _collection.Find(filter).FirstOrDefaultAsync();

            return train;
        }

        /// <summary>
        /// Change the active status of a train asynchronously.
        /// </summary>
        public async Task<Train> ChangeActiveStatus(string regNo, bool isActive)
        {
            var filter = Builders<Train>.Filter.Eq(t => t.RegistraionNo, regNo);
            var update = Builders<Train>.Update.Set(t => t.IsActive, isActive);

            // Find and update the train document
            var updatedUser = await _collection.FindOneAndUpdateAsync(filter, update);

            return updatedUser;
        }

        /// <summary>
        /// Retrieve all trains asynchronously.
        /// </summary>
        public async Task<List<Train>> GetAllTrainsAsync()
        {
            // Create a filter to match documents where IsDelete is not true
            var filter = Builders<Train>.Filter.Eq(u => u.IsDelete, false);

            // Use the filter when querying the collection
            return await _collection.Find(filter).ToListAsync();
        }

        /// <summary>
        /// Retrieve all active trains (not canceled) asynchronously.
        /// </summary>
        public async Task<List<Train>> GetAllTrainsNotCancelAsync()
        {
            // Create a filter to match documents where IsDelete is not true and IsActive is true
            var filter = Builders<Train>.Filter.Eq(u => u.IsDelete, false) & Builders<Train>.Filter.Eq(u => u.IsActive, true);

            // Use the filter when querying the collection
            return await _collection.Find(filter).ToListAsync();
        }

        /// <summary>
        /// Update train information asynchronously.
        /// </summary>
        public async Task<Train> UpdateTrain(TrainReqBodyDto train)
        {
            var filter = Builders<Train>.Filter.Eq(u => u.RegistraionNo, train.RegistraionNo);
            var update = Builders<Train>.Update
                .Set(u => u.Name, train.Name)
                .Set(u => u.ImagePath, train.ImagePath);

            // Find and update the train document
            var updated = await _collection.FindOneAndUpdateAsync(filter, update);

            return updated;
        }

        /// <summary>
        /// Delete a train asynchronously.
        /// </summary>
        public async Task DeleteTrain(ObjectId id)
        {
            var filter = Builders<Train>.Filter.Eq(u => u.Id, id);
            var update = Builders<Train>.Update
                .Set(u => u.IsDelete, true);

            // Find and update the train document
            await _collection.FindOneAndUpdateAsync(filter, update);
        }
    }
}