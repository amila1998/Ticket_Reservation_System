using MongoDB.Bson;

namespace trs_web_service.Models.Domains
{
    public class Request
    {
        public ObjectId Id { get; set; }
        public string AgentId {  get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<Booking> Bookings { get; set; }
        public bool IsReqAccepted { get; set; }
        public bool IsDelete { get; set; }
    }
}
