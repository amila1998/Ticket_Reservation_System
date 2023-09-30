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

        public async Task CreateAsync(Train train)
        {
            await _collection.InsertOneAsync(train);
        }

        public async Task<Train> GetByRegistraionNoAsync(string regNo)
        {
            return await _collection.Find(t => t.RegistraionNo == regNo).FirstOrDefaultAsync();
        }

        public async Task<Train> GetByRegistrationNoAsync(string regNo)
        {
            return await _collection.Find(t => t.RegistraionNo == regNo).FirstOrDefaultAsync();
        }

        public async Task<Train> ChangeActiveStatus(string regNo, bool isActive)
        {
            var filter = Builders<Train>.Filter.Eq(t => t.RegistraionNo, regNo);
            var update = Builders<Train>.Update.Set(t => t.IsActive, isActive);

            // Find and update the user document
            var updatedUser = await _collection.FindOneAndUpdateAsync(filter, update);

            return updatedUser;
        }


        public async Task<List<Train>> GetAllTrainsAsync()
        {
            //string name, string regNo, int page, int pageSize
            //var filterBuilder = Builders<Train>.Filter;
            //var filter = filterBuilder.Empty; // Start with an empty filter

            //if (!string.IsNullOrWhiteSpace(name))
            //{
            //    // Add filter criteria for name if provided
            //    filter &= filterBuilder.Eq(t => t.Name, name);
            //}

            //if (!string.IsNullOrWhiteSpace(regNo))
            //{
            //    // Add filter criteria for registration number if provided
            //    filter &= filterBuilder.Eq(t => t.RegistraionNo, regNo);
            //}

            //var skip = (page - 1) * pageSize;
            //var result = await _collection.Find(filter).Skip(skip).Limit(pageSize).ToListAsync();
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<Train> UpdateTrain(TrainReqBodyDto train)
        {
            var filter = Builders<Train>.Filter.Eq(u => u.RegistraionNo, train.RegistraionNo);
            var update = Builders<Train>.Update
                .Set(u => u.Name, train.Name)
                .Set(u => u.ImagePath, train.ImagePath);

            // Find and update the user document
            var updated = await _collection.FindOneAndUpdateAsync(filter, update);

            return updated;
        }

    }
}
