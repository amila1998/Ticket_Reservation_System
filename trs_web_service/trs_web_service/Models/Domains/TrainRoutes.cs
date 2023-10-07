using MongoDB.Bson;

namespace trs_web_service.Models.Domains
{
    public class TrainRoutes
    {
        public ObjectId Id { get; set; }
        public required string RouteName { get; set; }
        public required string StartStation { get; set; }
        public required string EndStation { get; set; }
        public List<string>? Stations { get; set; }
        public bool IsDisable { get; set; }
        public bool IsDelete { get; set; }

        public static implicit operator TrainRoutes(List<TrainRoutes> v)
        {
            throw new NotImplementedException();
        }
    }
}
