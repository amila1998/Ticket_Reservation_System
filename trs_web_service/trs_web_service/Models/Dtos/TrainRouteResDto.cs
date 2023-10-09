using trs_web_service.Models.Domains;

namespace trs_web_service.Models.Dtos
{
    public class TrainRouteResDto
    {
        public required string Id { get; set; }
        public required string RouteName { get; set; }
        public required string StartStation { get; set; }
        public required string EndStation { get; set; }
        public List<TrainStopStations>? Stations { get; set; }
        public bool IsDisable { get; set; }
    }
}
