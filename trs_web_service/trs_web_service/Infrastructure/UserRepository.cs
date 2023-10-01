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
            var update = Builders<User>.Update.Set(u => u.IsActive, false).Set(u => u.IsSendActiveStatus, false);

            // Find and update the user document
            var updatedUser = await _collection.FindOneAndUpdateAsync(filter, update);

            return updatedUser;
        }

        public async Task<User> SendActiveStatusAsync(string nic)
        {
            var filter = Builders<User>.Filter.Eq(u => u.NIC, nic);
            var update = Builders<User>.Update.Set(u => u.IsActive, false).Set(u => u.IsSendActiveStatus, true);

            // Find and update the user document
            var updatedUser = await _collection.FindOneAndUpdateAsync(filter, update);

            return updatedUser;
        }

        public async Task<User> ActivateUserAsync(string nic)
        {
            var filter = Builders<User>.Filter.Eq(u => u.NIC, nic);
            var update = Builders<User>.Update.Set(u => u.IsActive, true).Set(u => u.IsSendActiveStatus, true);

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

        public async Task<User> UpdateUser(UpdateUserDto user)
        {
            var filter = Builders<User>.Filter.Eq(u => u.NIC, user.NIC);
            var update = Builders<User>.Update.Set(u => u.Role, user.Role);

            if (user.IsPasswordReset)
            {
                // If the password needs to be reset, add the password update to the update definition
                update = Builders<User>.Update.Combine(update, Builders<User>.Update.Set(u => u.Password, user.Password));
            }

            // Find and update the user document
            var options = new FindOneAndUpdateOptions<User>
            {
                ReturnDocument = ReturnDocument.After // This option returns the updated document
            };

            var updatedUser = await _collection.FindOneAndUpdateAsync(filter, update, options);

            return updatedUser;
        }

        public async Task CreateAsync(User user)
        {
            await _collection.InsertOneAsync(user);
        }

    }
}
