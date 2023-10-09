namespace trs_web_service.Models.Dtos
{
    public class UpdateUserDto
    {
        public string NIC { get; set; }
        public string Role { get; set; }
        public bool IsPasswordReset { get; set; }
        public string Password { get; set; }
    }
}
