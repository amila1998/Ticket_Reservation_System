using System.ComponentModel.DataAnnotations;

namespace trs_web_service.Models.Dtos
{
    public class UserRegisterDto
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string NIC { get; set; }
        public string ImagePath { get; set; }
        public string ContactNo { get; set; }
    }
}
