////Models/Dtos/ForgotDto.cs

namespace trs_web_service.Models.Dtos
{
    public class ForgotDto
    {
        public required string NIC { get; set; }
        public required string Email { get; set; }
    }
}
