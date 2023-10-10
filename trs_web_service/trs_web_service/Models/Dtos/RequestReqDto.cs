using trs_web_service.Models.Domains;

namespace trs_web_service.Models.Dtos
{
    public class RequestReqDto
    {
        public string AgentId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<BookingDto> Bookings { get; set; }
        public bool IsReqAccepted { get; set; }
    }
}
