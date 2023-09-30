using MongoDB.Bson;
using MongoDB.Driver;
using trs_web_service.Models.Domains;
using trs_web_service.Models.Dtos;

namespace trs_web_service.Infrastructure
{
    public class UserRepository
    {
        private readonly IMongoCollection<User> _collection;

        public UserRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<User>("Users");
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<User> GetByNICAsync(string nic)
        {
            return await _collection.Find(t => t.NIC == nic).FirstOrDefaultAsync();
        }

        public async Task<User> GetByIdAsync(ObjectId id)
        {
            return await _collection.Find(t => t.Id == id).FirstOrDefaultAsync();
        }


        public async Task<User> DeactivateUserAsync(string nic)
        {
            var filter = Builders<User>.Filter.Eq(u => u.NIC, nic);
            var update = Builders<User>.Update.Set(u => u.IsActive, false);

            // Find and update the user document
            var updatedUser = await _collection.FindOneAndUpdateAsync(filter, update);

            return updatedUser;
        }

        public async Task<User> ActivateUserAsync(string nic)
        {
            var filter = Builders<User>.Filter.Eq(u => u.NIC, nic);
            var update = Builders<User>.Update.Set(u => u.IsActive, true);

            // Find and update the user document
            var updatedUser = await _collection.FindOneAndUpdateAsync(filter, update);

            return updatedUser;
        }

        public async Task<User> UserUpdateProfile(UserUpdateDto user, ObjectId id)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, id);
            var update = Builders<User>.Update
                .Set(u => u.Name, user.Name)
                .Set(u => u.ImagePath, user.ImagePath)
                .Set(u => u.ContactNo, user.ContactNo);

            // Find and update the user document
            var updatedUser = await _collection.FindOneAndUpdateAsync(filter, update);

            return updatedUser;
        }

        public async Task CreateAsync(User user)
        {
            await _collection.InsertOneAsync(user);
        }

    }
}
