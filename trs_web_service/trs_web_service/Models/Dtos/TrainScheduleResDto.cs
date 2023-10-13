using trs_web_service.Models.Domains;

namespace trs_web_service.Models.Dtos
{
    public class TrainScheduleResDto
    {
        public string Id { get; set; }
        public DayType DayType { get; set; }
        public string TraingRegistraionNo { get; set; }
        public bool IsCancel { get; set; }
        public string StartStation { get; set; }
        public string EndStation { get; set; }
        public List<TrainScheduleStopStations> TrainStops { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public List<ClassTypes> TrainClasses { get; set; }
        public List<DateTime> CancelDates { get; set; }
        public TrainSpeed Speed { get; set; }
        public bool IsCancelledToday { get; internal set; }
        public string TrainRouteId { get; set; }
    }
}
