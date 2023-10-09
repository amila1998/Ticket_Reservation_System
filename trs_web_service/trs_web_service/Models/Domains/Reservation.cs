using MongoDB.Bson;

namespace trs_web_service.Models.Domains
{
    public class Reservation
    {
        public ObjectId Id { get; set; }
        public DateTime CreatedAt { get; set; }

        public List<Booking> Bookings { get; set; }

        public string OwnerId { get; set; }

        public DateTime ValidDate { get; set; }

        public float TotalPrice { get; set; }


    }

    public class Booking
    {
        public ObjectId Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string ScheduleId { get; set; }
        public string PickStation { get; set; }
        public string DropStation { get; set; }
        public int TickectCount { get; set; }
        public float TickectPrice { get; set; }

    }
}
