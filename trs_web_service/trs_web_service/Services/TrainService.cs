/// Services/TrainService.cs

using trs_web_service.Infrastructure;
using trs_web_service.Models.Domains;
using trs_web_service.Models.Dtos;

namespace trs_web_service.Services
{
	public class TrainService
	{
		private readonly TrainRepository _repository;
		private readonly TrainScheduleRepository _trainScheduleRepository;
		private readonly ReservationRepository _reservationRepository;

		public TrainService(TrainRepository repository, TrainScheduleRepository trainScheduleRepository, ReservationRepository reservationRepository)
		{
			_repository = repository;
			_trainScheduleRepository = trainScheduleRepository;
			_reservationRepository = reservationRepository;
		}


        /// <summary>
        /// create a train
        /// </summary>
        /// <param TrainReqBodyDto></param>
        /// <returns></returns>
        public async Task CreateTrainAsync(TrainReqBodyDto train)
		{
			var exTrain = await _repository.GetByRegistraionNoAsync(train.RegistraionNo);
			if (exTrain != null)
			{
				throw new Exception("Already have a train unthe that registration number");
			}

			Train newTrain = new()
			{
				RegistraionNo = train.RegistraionNo,
				Name = train.Name,
				ImagePath = train.ImagePath == null || train.ImagePath == "" ? "https://res.cloudinary.com/amiladevin1998/image/upload/v1696069476/download_cmzzo6.png" : train.ImagePath,
				IsActive = false

			};
			await _repository.CreateAsync(newTrain);
		}



        /// <summary>
        /// get all trains
        /// </summary>
        /// <param TrainReqBodyDto></param>
        /// <returns>TrainResDto list</returns>
        public async Task<IEnumerable<TrainResDto>> GetAllTrainsAsync()
		{
			List<TrainResDto> trains = new();
			var trainList = await _repository.GetAllTrainsAsync();
			if (trainList != null)
			{
				foreach (var train in trainList)
				{
					// Convert the ObjectId to the desired format
					string formattedId = train.Id.ToString().Substring(0, 24);
					TrainResDto newTrain = new(formattedId, train.Name, train.RegistraionNo, train.ImagePath, train.IsActive);
					trains.Add(newTrain);
				}

			}
			return trains;
		}


        /// <summary>
        /// change active status in  atrain
        /// </summary>
        /// <param train registration number></param>
        /// <returns></returns>
        public async Task ChangeActiveStatus(string regNo)
		{
			var train = await _repository.GetByRegistraionNoAsync(regNo) ?? throw new Exception("No train under this registration number");
			bool changeActiveStatus = !train.IsActive;
			var schedule = await _trainScheduleRepository.GetBySheduleByTrainRegistraionNoAndNoCancelAsync(train.RegistraionNo);
			if (changeActiveStatus)
			{
				if (schedule.Count > 0)
				{
					await _repository.ChangeActiveStatus(regNo, !train.IsActive);
				}
				else
				{
					throw new Exception("Can not change status, Beacuse there is no active schedules ");
				}
			}
			else
			{
				if (schedule.Count == 0)
				{
					await _repository.ChangeActiveStatus(regNo, !train.IsActive);
				}
				else
				{
					foreach (var s in schedule)
					{
						string formattedScheduleId = s.Id.ToString().Substring(0, 24);
						var reservations = await _reservationRepository.GetValidReservationsByScheduleIdAsync(formattedScheduleId);
						if (reservations.Count > 0)
						{
							throw new Exception("Can not change status, Beacuse there is one or more reservations ");
						}
					}

					await _trainScheduleRepository.CancelSheduleByTrainRegNo(train.RegistraionNo);
					await _repository.ChangeActiveStatus(regNo, !train.IsActive);
				}
			}
		}


        /// <summary>
        ///update a  atrain
        /// </summary>
        /// <param TrainReqBodyDto></param>
        /// <returns></returns>
        public async Task UpdateTrain(TrainReqBodyDto train)
		{
			var extrain = await _repository.GetByRegistraionNoAsync(train.RegistraionNo) ?? throw new Exception("No train under this registration number");
			await _repository.UpdateTrain(train);
		}
	}
}
