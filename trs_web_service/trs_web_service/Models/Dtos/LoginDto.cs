namespace trs_web_service.Models.Dtos
{
    public class LoginDto
    {
        public required string Password { get; set; }
        public required string NIC { get; set; }
    }
}
