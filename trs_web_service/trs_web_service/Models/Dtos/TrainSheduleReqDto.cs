using trs_web_service.Models.Domains;

namespace trs_web_service.Models.Dtos
{
    public class TrainSheduleReqDto
    {
            public DayType DayType { get; set; }
            public required string TraingRegistraionNo { get; set; }
            public bool IsCancel { get; set; }
            public required string StartStation { get; set; }
            public required string EndStation { get; set; }
            public required List<TrainStopsDto> TrainStops { get; set; }
            public required string StartTime { get; set; }
            public required string EndTime { get; set; }
            public required List<TrainClassesDto> TrainClasses { get; set; }
            public List<DateTime>? CancelDates { get; set; }
    }
    public class TrainClassesDto
    {
        public required ClassTypes ClassType { get; set; }
    }
    public class TrainStopsDto
    {
        public required string StationName { get; set; }
        public required string NavTime { get; set; }
    }
}
