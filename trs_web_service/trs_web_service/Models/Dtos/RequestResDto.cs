////Models/Dtos/RequestResDto.cs

namespace trs_web_service.Models.Dtos
{
    public class RequestResDto
    {
       public string Id { get; set; }
        public string AgentId { get; set; }

        public UserDto AgentDetails { get; set; }
        public string CreatedBy { get; set; }
        public UserDto CreatedByDetails { get; set; }
        public DateTime CreatedAt { get; set; }
        public BookingResDto Booking { get; set; }
        public bool IsReqAccepted { get; set; }
    }
}
