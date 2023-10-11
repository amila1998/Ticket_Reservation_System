namespace trs_web_service.Models.Dtos
{
    public class UserDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string NIC { get; set; }
        public string ImagePath { get; set; }
        public string ContactNo { get; set; }
        public bool IsSendActiveStatus { get; set; }
        public bool IsActive { get; set; }

        public UserDto(string Id, string Name, string Role, string NIC, string ImagePath, string ContactNo,bool IsActive, bool IsSendActiveStatus, string Email)
        {
            this.Id = Id;
            this.Name = Name;
            this.Role = Role;
            this.NIC = NIC;
            this.ImagePath = ImagePath;
            this.ContactNo = ContactNo;
            this.IsActive = IsActive;
            this.IsSendActiveStatus = IsSendActiveStatus;
            this.Email = Email;
        }

        public UserDto() { }

   
    }
}
