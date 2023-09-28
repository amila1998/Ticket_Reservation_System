using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace trs_web_service.Models.Domains
{
    public class User
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string ImagePath { get; set; }
        public string ContactNo { get; set; }
        public bool IsActive { get; set; }

        public bool IsSendActiveStatus { get; set; }

        [Required(ErrorMessage = "NIC is required")]
        public string NIC { get; set; }

        public User()
        {
            IsActive = true; // Set the default value to true in the constructor
            IsSendActiveStatus = true; // Set the default value to true in the constructor
        }
    }
}
