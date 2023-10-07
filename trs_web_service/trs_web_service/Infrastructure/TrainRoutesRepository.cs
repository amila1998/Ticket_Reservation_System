using MongoDB.Bson;
using MongoDB.Driver;
using trs_web_service.Models.Domains;
using trs_web_service.Models.Dtos;

namespace trs_web_service.Infrastructure
{
    public class TrainRoutesRepository
    {
        private readonly IMongoCollection<TrainRoutes> _collection;

        public TrainRoutesRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<TrainRoutes>("TrainRoutes");
        }

        public async Task CreateAsync(TrainRoutes route)
        {
            await _collection.InsertOneAsync(route);
        }

        public async Task<List<TrainRoutes>> GetAllTrainRoutesAsync()
        {
            // Create a filter to match documents where IsDelete is not true
            var filter = Builders<TrainRoutes>.Filter.Eq(u => u.IsDelete, false);

            // Use the filter when querying the collection
            return await _collection.Find(filter).ToListAsync();
        }


        public async Task DisableRoute(ObjectId id)
        {
            var filter = Builders<TrainRoutes>.Filter.Eq(u => u.Id, id);
            var update = Builders<TrainRoutes>.Update
                .Set(u => u.IsDisable, true);

            // Find and update the user document
            await _collection.FindOneAndUpdateAsync(filter, update);
        }

        public async Task EnableRoute(ObjectId id)
        {
            var filter = Builders<TrainRoutes>.Filter.Eq(u => u.Id, id);
            var update = Builders<TrainRoutes>.Update
                .Set(u => u.IsDisable, false);

            // Find and update the user document
            await _collection.FindOneAndUpdateAsync(filter, update);
        }

        public async Task DeleteRoute(ObjectId id)
        {
            var filter = Builders<TrainRoutes>.Filter.Eq(u => u.Id, id);
            var update = Builders<TrainRoutes>.Update
                .Set(u => u.IsDelete, true);

            // Find and update the user document
            await _collection.FindOneAndUpdateAsync(filter, update);
        }

        public async Task<TrainRoutes> GetRouteByStartAndEnd(string start, string end)
        {          
            // Create a filter to find the route with the given start and end stations
             var filter = Builders<TrainRoutes>.Filter.Eq(x => x.StartStation, start) &
                          Builders<TrainRoutes>.Filter.Eq(x => x.EndStation, end) &
                          Builders<TrainRoutes>.Filter.Eq(x => x.IsDelete, false);

            // Use Find method to search for the route
            var route = await _collection.Find(filter).FirstOrDefaultAsync();

            return route;
        }

        public async Task<TrainRoutes> GetById(ObjectId id)
        {
            // Create a filter to find the route with the given start and end stations
            var filter = Builders<TrainRoutes>.Filter.Eq(x => x.Id, id) &
                          Builders<TrainRoutes>.Filter.Eq(x => x.IsDelete, false);

            // Use Find method to search for the route
            TrainRoutes route = await _collection.Find(filter).FirstOrDefaultAsync();

            return route;
        }

        public async Task UpdateRoute(TrainRoutes trainRoutes)
        {
            var filter = Builders<TrainRoutes>.Filter.Eq(t => t.Id, trainRoutes.Id);
            var update = Builders<TrainRoutes>.Update.Set(t => t.Stations, trainRoutes.Stations);

            // Find and update the user document
            await _collection.FindOneAndUpdateAsync(filter, update);
        }

    }
}
