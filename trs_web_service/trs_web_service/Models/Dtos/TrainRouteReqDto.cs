namespace trs_web_service.Models.Dtos
{
    public class TrainRouteReqDto
    {
        public required string RouteName { get; set; }
        public required string StartStation { get; set; }
        public required string EndStation { get; set; }
        public List<string>? Stations { get; set; }

    }
}
