using MongoDB.Bson;

namespace trs_web_service.Models.Dtos
{
    public class TrainReqBodyDto
    {
        public string Name { get; set; }
        public string RegistraionNo { get; set; }
        public string ImagePath { get; set; }
    }
}
