using MongoDB.Bson;
using MongoDB.Driver;
using trs_web_service.Models.Domains;

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
            return await _collection.Find(u => u.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(User user)
        {
            await _collection.InsertOneAsync(user);
        }

    }
}
