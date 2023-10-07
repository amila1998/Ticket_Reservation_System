using MongoDB.Bson;

namespace trs_web_service.Models.Domains
{
    public class TrainSchedule
    {
        public ObjectId Id { get; set; }
        public DayType DayType { get; set; }
        public required string TraingRegistraionNo { get; set; }
        public bool IsCancel { get; set; }
        public List<DateTime>? CancelDates { get; set; }
        public required string StartStation { get; set; }
        public required string EndStation { get; set; }
        public required List<TrainStops> TrainStops { get; set; }
        public required string StartTime { get; set; }
        public required string EndTime { get; set; }
        public required List<TrainClasses> TrainClasses { get; set; }
        public bool IsDelete { get; set; }
    }

    public enum DayType
    {
        All,//0
        Weekday, 
        Weekend,
        Sunday,
        Saturday,
    }

    public class TrainStops
    {
        public required string StationName { get; set; }
        public required string NavTime { get; set; }
    }

    public enum ClassTypes
    {
        First, //0
        Second,
        Third,
    }

    public class TrainClasses
    {
        public required ClassTypes ClassType { get; set; }
    }
}
