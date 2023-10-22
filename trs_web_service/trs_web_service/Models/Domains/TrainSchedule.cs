//Models/Domain/TrainSchedule.cs


using MongoDB.Bson;

namespace trs_web_service.Models.Domains
{
    public class TrainSchedule
    {
        public ObjectId Id { get; set; }
        public DayType DayType { get; set; }
        public required string TraingRegistraionNo { get; set; }
        public bool IsCancel { get; set; }
        public List<DateTime> CancelDates { get; set; }
        public required string TrainRouteId { get; set; }
        public  List<TrainScheduleStopStations> TrainStops { get; set; }
        public required string StartTime { get; set; }
        public required string EndTime { get; set; }
        public List<ClassTypes> TrainClasses { get; set; }
        public bool IsDelete { get; set; }

        public TrainSpeed Speed { get; set; }

        public TrainSchedule()
        {
        }
    }

    public class TrainScheduleStopStations
    {
        public TrainStopStations TrainStop { get; set; }
        public string NavTime { get; set; }
    }

    public enum DayType
    {
        All,//0
        Weekday, 
        Weekend,
        Sunday,
        Saturday,
    }

    public enum TrainSpeed
    {
        Express,//0
        Slow,
    }

    public enum ClassTypes
    {
        First, //0
        Second,
        Third,
    }
}
