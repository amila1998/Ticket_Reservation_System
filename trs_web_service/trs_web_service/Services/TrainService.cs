using trs_web_service.Infrastructure;
using trs_web_service.Models.Domains;
using trs_web_service.Models.Dtos;

namespace trs_web_service.Services
{
    public class TrainService
    {
        private readonly TrainRepository _repository;

        public TrainService(TrainRepository repository)
        {
            _repository = repository;
        }

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
                ImagePath = train.ImagePath ==null || train.ImagePath=="" ? "https://res.cloudinary.com/amiladevin1998/image/upload/v1696069476/download_cmzzo6.png": train.ImagePath,
                IsActive = false

            };
            await _repository.CreateAsync(newTrain);
        }

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
                    TrainResDto newTrain = new(formattedId, train.Name,train.RegistraionNo,train.ImagePath,train.IsActive);
                    trains.Add(newTrain);
                }

            }
            return trains;
        }

        public async Task ChangeActiveStatus(string regNo)
        {
            var train = await _repository.GetByRegistrationNoAsync(regNo) ?? throw new Exception("No train under this registration number");
            //TODO: should check there is any resevation or shedules

            await _repository.ChangeActiveStatus(regNo, !train.IsActive);


        }

        public async Task UpdateTrain(TrainReqBodyDto train)
        {
            var extrain = await _repository.GetByRegistrationNoAsync(train.RegistraionNo) ?? throw new Exception("No train under this registration number");
            //TODO: should check there is any resevation or shedules

            await _repository.UpdateTrain(train);


        }
    }
}
