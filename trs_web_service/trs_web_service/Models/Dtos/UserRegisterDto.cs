using System.ComponentModel.DataAnnotations;

namespace trs_web_service.Models.Dtos
{
    public class UserRegisterDto
    {
        public required string Name { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }
        public required string NIC { get; set; }
        public string? ImagePath { get; set; }
        public required string ContactNo { get; set; }
    }
}
