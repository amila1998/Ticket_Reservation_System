using trs_web_service.Infrastructure;

namespace trs_web_service.Services
{
    public class ReservationService
    {
        private readonly ReservationRepository _repository;
        private readonly TrainScheduleRepository _trainScheduleRepository;

        public ReservationService(ReservationRepository repository, TrainScheduleRepository rainScheduleRepository)
        {
            _repository = repository;
            _trainScheduleRepository = rainScheduleRepository;
        }



    }
}
