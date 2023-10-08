using MongoDB.Bson;
using trs_web_service.Infrastructure;
using trs_web_service.Models.Domains;
using trs_web_service.Models.Dtos;

namespace trs_web_service.Services
{
    public class TrainScheduleService
    {
        private readonly TrainRepository _trainRepository;
        private readonly TrainScheduleRepository _repository;
        private readonly TrainRoutesRepository _routesRepository;

        public TrainScheduleService(TrainRepository repository, TrainScheduleRepository trainScheduleRepository, TrainRoutesRepository routesRepository)
        {
            _trainRepository = repository;
            _repository = trainScheduleRepository;
            _routesRepository = routesRepository;
        }
        public async Task CreateTrainScheduleAsync(TrainScheduleReqDto schedule)
        {
            var exTrain = await _trainRepository.GetByRegistraionNoAsync(schedule.TrainRegistraionNo);
            if (exTrain == null)
            {
                throw new Exception("There is no train under requested registration number");
            }

            TrainSchedule newSchedule = new()
            {
                DayType = (DayType)schedule.DayType,
                TraingRegistraionNo = schedule.TrainRegistraionNo,
                CancelDates = schedule.CancelDates,
                TrainRouteId = schedule.TrainRouteId,
                TrainStops = schedule.TrainStops,
                StartTime = schedule.StartTime,
                EndTime = schedule.EndTime,
                TrainClasses = schedule.TrainClasses,
                IsDelete=false,
            };
            await _repository.CreateAsync(newSchedule);
        }

        public async Task<IEnumerable<TrainScheduleTravelerResDto>> GetAllShedulesAsync()
        {
            List<TrainScheduleTravelerResDto> trainSchedules = new();
           
            var trains = await _trainRepository.GetAllTrainsNotCancelAsync();

            if (trains.Count > 0)
            {
                DateTime today = DateTime.Today;
                foreach (var train in trains)
                {
                    List<ScheduleForTravelerDto> schedules = new();
                    var allSchedules = await _repository.GetBySheduleByTrainRegistraionNoAsync(train.RegistraionNo);
                    TrainsForTraverDto trainsForTraverDto = new()
                    {
                        Id = train.Id.ToString().Substring(0, 24),
                        Name = train.Name,
                        RegistraionNo = train.RegistraionNo,
                        ImagePath = train.ImagePath
                    };
                    if(allSchedules.Count > 0) 
                    {
                        foreach (var schedule in allSchedules)
                        {

                            if (!ObjectId.TryParse(schedule.TrainRouteId, out var routeObjectId))
                            {
                                throw new Exception("Invalid ID format");
                            }

                            var route = await _routesRepository.GetById(routeObjectId);
                            if (route != null)
                            {
                                bool isCancelledToday = schedule.CancelDates?.Any(date => date.Date == today) ?? false;
                                ScheduleForTravelerDto scheduleForTravelerDto = new()
                                {
                                    Id = schedule.Id.ToString().Substring(0, 24),
                                    DayType = (DayType)schedule.DayType,
                                    StartStation = route.StartStation,
                                    EndStation = route.EndStation,
                                    TrainStops = schedule.TrainStops,
                                    StartTime = schedule.StartTime,
                                    EndTime = schedule.EndTime,
                                    TrainClasses = schedule.TrainClasses,
                                    CancelDates = schedule.CancelDates,
                                    IsCancelledToday = isCancelledToday,
                                };
                                schedules.Add(scheduleForTravelerDto);
                            }
                        }
                    }
                    TrainScheduleTravelerResDto trainScheduleResDto = new()
                    {
                        TrainForTraver = trainsForTraverDto,
                        SchedulesForTraveler = schedules,
                    };
                    trainSchedules.Add(trainScheduleResDto);
                }
                
            }    
            return trainSchedules;
        }

        public async Task<IEnumerable<TrainScheduleResDto>> GetAllShedulesForManageAsync(string tRegNo)
        {
            List<TrainScheduleResDto> schedules = new();
            var allSchedules = await _repository.GetAllTrainShedulesAsync(tRegNo);
            if (allSchedules.Count > 0)
            {
                foreach (var schedule in allSchedules)
                {
                    var train = await _trainRepository.GetByRegistraionNoAsync(schedule.TraingRegistraionNo);
                    if (!ObjectId.TryParse(schedule.TrainRouteId, out var routeObjectId))
                    {
                        throw new Exception("Invalid ID format");
                    }

                    var route = await _routesRepository.GetById(routeObjectId);
                    if (route != null && train != null)
                    {
                        TrainScheduleResDto trainScheduleResDto = new()
                        {
                            Id = schedule.Id.ToString().Substring(0, 24),
                            DayType = (DayType)schedule.DayType,
                            TraingRegistraionNo = schedule.TraingRegistraionNo,
                            StartStation = route.StartStation,
                            EndStation = route.EndStation,
                            TrainStops = schedule.TrainStops,
                            StartTime = schedule.StartTime,
                            EndTime = schedule.EndTime,
                            TrainClasses = schedule.TrainClasses,
                            CancelDates = schedule.CancelDates,
  
                        };
                        schedules.Add(trainScheduleResDto);
                    }
                }
            }
            return schedules;
        }

        public async Task CancelShedule(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                throw new Exception("Invalid ID format");
            }
            var schedule = await _repository.GetAllByIdAsync(objectId) ?? throw new Exception("No shedule");
            // TODO: any have bookings

            await _repository.CancelShedule(objectId);

        }

        //public async Task UpdateTrain(TrainReqBodyDto train)
        //{
        //    var extrain = await _repository.GetByRegistraionNoAsync(train.RegistraionNo) ?? throw new Exception("No train under this registration number");
        //    //TODO: should check there is any resevation or shedules

        //    await _repository.UpdateTrain(train);


        //}

    }
}
