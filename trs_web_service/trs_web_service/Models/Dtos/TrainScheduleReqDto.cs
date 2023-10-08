using trs_web_service.Models.Domains;

namespace trs_web_service.Models.Dtos
{
    public class TrainScheduleReqDto
    {
            public string Id { get; set; }
            public DayType? DayType { get; set; }
            public required string TrainRegistraionNo { get; set; }
            public bool? IsCancel { get; set; }
            public  List<TrainScheduleStopStations> TrainStops { get; set; }
            public required string StartTime { get; set; }
            public required string EndTime { get; set; }
            public  List<ClassTypes>? TrainClasses { get; set; }
            public List<DateTime>? CancelDates { get; set; }
            public required string TrainRouteId { get; set; }
            public TrainSpeed Speed { get; set; }
    }
}
