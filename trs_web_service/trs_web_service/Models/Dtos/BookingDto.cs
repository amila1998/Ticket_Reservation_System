using MongoDB.Bson;

namespace trs_web_service.Models.Dtos
{
    public class BookingDto
    {
        public string Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string ScheduleId { get; set; }
        public string PickStation { get; set; }
        public string DropStation { get; set; }
        public DateTime BookingDate { get; set; }
        public double TickectCount { get; set; }
        public float TickectPrice { get; set; }
    }

    public class BookingResDto
    {
        public string Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string ScheduleId { get; set; }
        public TrainScheduleResDto ScheduleDetails { get; set; }
        public TrainsForTraverDto TrainDetails { get; set; }
        public UserDto CreatedByDetails { get; set; }
        public string PickStation { get; set; }
        public string DropStation { get; set; }
        public DateTime BookingDate { get; set; }
        public double TickectCount { get; set; }
        public float TickectPrice { get; set; }
    }
}
