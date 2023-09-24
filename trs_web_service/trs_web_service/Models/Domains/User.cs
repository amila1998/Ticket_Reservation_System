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
        public bool IsActive { get; set; }
        [Required(ErrorMessage = "NIC is required")]
        public string NIC { get; set; }

        public User()
        {
            IsActive = true; // Set the default value to true in the constructor
        }

        public User (ObjectId id, string name, string password, string role, bool isActive, string nIC)
        {
            Id = id;
            Name = name;
            Password = password;
            Role = role;
            IsActive = isActive;
            NIC = nIC;
        }
    }
}
