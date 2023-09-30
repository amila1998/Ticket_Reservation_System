using trs_web_service.Models.Domains;

namespace trs_web_service.Models.Dtos
{
    public class TrainSheduleResDto
    {
        public string Id { get; set; }
        public DayType DayType { get; set; }
        public required string TraingRegistraionNo { get; set; }
        public bool IsCancel { get; set; }
        public required string StartStation { get; set; }
        public required string EndStation { get; set; }
        public required List<TrainStopsDto> TrainStops { get; set; }
        public required string StartTime { get; set; }
        public required string EndTime { get; set; }
        public required List<TrainClassesDto> TrainClasses { get; set; }
        public List<DateTime>? CancelDates { get; set; }

        public TrainSheduleResDto(string id, DayType dayType, string traingRegistraionNo, bool isCancel, string startStation, string endStation, List<TrainStopsDto> trainStops, string startTime, string endTime, List<TrainClassesDto> trainClasses, List<DateTime>? cancelDates)
        {
            Id = id;
            DayType = dayType;
            TraingRegistraionNo = traingRegistraionNo;
            IsCancel = isCancel;
            StartStation = startStation;
            EndStation = endStation;
            TrainStops = trainStops;
            StartTime = startTime;
            EndTime = endTime;
            TrainClasses = trainClasses;
            CancelDates = cancelDates;
        }
    }
}
