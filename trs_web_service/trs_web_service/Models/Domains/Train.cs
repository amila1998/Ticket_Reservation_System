using MongoDB.Bson;

namespace trs_web_service.Models.Domains
{
    public class Train
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public string RegistraionNo { get; set; }

        public string ImagePath { get; set; }

        public bool IsActive { get; set; }
    }
}
