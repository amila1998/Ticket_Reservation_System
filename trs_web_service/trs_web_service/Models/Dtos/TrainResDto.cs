using MongoDB.Bson;

namespace trs_web_service.Models.Dtos
{
    public class TrainResDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string RegistraionNo { get; set; }

        public string ImagePath { get; set; }
        public bool IsActive { get; set; }

        public TrainResDto(string Id, string Name, string RegistraionNo, string ImagePath, bool IsActive) { 
            this.Id = Id;
            this.Name = Name;
            this.RegistraionNo = RegistraionNo;
            this.ImagePath = ImagePath;
            this.IsActive = IsActive;
        }

       
    }
}
