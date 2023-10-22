////Models/Dtos/TrainScheduleTravelerResDto.cs

using trs_web_service.Models.Domains;

namespace trs_web_service.Models.Dtos
{
    public class TrainScheduleTravelerResDto
    {
     public TrainsForTraverDto TrainForTraver { get; set; }
     public List<ScheduleForTravelerDto> SchedulesForTraveler { get; set; }

    }

    //Class for TrainsForTraverDto
    public class TrainsForTraverDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string RegistraionNo { get; set; }
        public string ImagePath { get; set; }
    }

    //class for ScheduleForTravelerDto

    public class ScheduleForTravelerDto
    {
        public string Id { get; set; }
        public DayType DayType { get; set; }
        public string StartStation { get; set; }
        public string EndStation { get; set; }
        public List<TrainScheduleStopStations> TrainStops { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public List<ClassTypes> TrainClasses { get; set; }
        public List<DateTime> CancelDates { get; set; }
        public bool IsCancelledToday { get; set; }
        public TrainSpeed Speed { get; set; }
    }
}
