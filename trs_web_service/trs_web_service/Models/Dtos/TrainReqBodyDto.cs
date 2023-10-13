////Models/Dtos/TrainReqBodyDto.cs

using MongoDB.Bson;
using trs_web_service.Models.Domains;

namespace trs_web_service.Models.Dtos
{
    public class TrainReqBodyDto
    {
        public string Name { get; set; }
        public string RegistraionNo { get; set; }
        public string ImagePath { get; set; }
    }
}
