namespace trs_web_service.Models.Dtos
{
    public class CalculatePriceReqDto
    {
        public double NoOfPersons { get; set; }
        public string ScheduleId { get; set; }
        public string PickStation { get; set; }
        public string DropStation { get; set; }
    }
}
