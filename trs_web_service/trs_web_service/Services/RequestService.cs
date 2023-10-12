using MongoDB.Bson;
using Org.BouncyCastle.Ocsp;
using System.Text;
using trs_web_service.Infrastructure;
using trs_web_service.Models.Domains;
using trs_web_service.Models.Dtos;

namespace trs_web_service.Services
{
    public class RequestService
    {
        private readonly RequestRepository _repository;
        private readonly ReservationRepository _reservationRepository;
        private readonly TrainScheduleRepository _trainScheduleRepository;
        private readonly TrainRoutesRepository _trainRoutesRepository;
        private readonly TrainRepository _trainRepository;
        private readonly UserRepository _userRepository;

        private static readonly Random random = new Random();
        public RequestService(RequestRepository repository, ReservationRepository reservationRepository, TrainScheduleRepository rainScheduleRepository, TrainRoutesRepository trainRoutesRepository, TrainRepository trainRepository, UserRepository userRepository)
        {
            _repository = repository;
            _reservationRepository = reservationRepository;
            _trainScheduleRepository = rainScheduleRepository;
            _trainRoutesRepository = trainRoutesRepository;
            _trainRepository = trainRepository;
            _userRepository = userRepository;
        }

        public async Task CreateRequest(RequestReqDto req, ObjectId userId)
        {
            ;
            if (req.Booking == null)
            {
                throw new Exception("Booking can not be null");
            }

            if (req.Booking.BookingDate > DateTime.Today.AddDays(30))
            {
                throw new Exception("Booking date must be within 30 days arround");
            }

            if (!ObjectId.TryParse(req.Booking.ScheduleId, out var sheduleObjectId))
            {
                throw new Exception("Invalid ID format");
            }

            var schedule = await _trainScheduleRepository.GetAllByIdAsync(sheduleObjectId) ?? throw new Exception("Invalid Schedule ID");

            if (!ObjectId.TryParse(schedule.TrainRouteId, out var routeObjectId))
            {
                throw new Exception("Invalid ID format");
            }

            var route = await _trainRoutesRepository.GetById(routeObjectId) ?? throw new Exception("Invalid route ID");

            int startStationOrderNo = 0;
            int endStationOrderNo = 0;

            if (route.StartStation == req.Booking.PickStation)
            {
                startStationOrderNo = 1;
            }
            else if (schedule.TrainStops.Count > 0)
            {
                foreach (var ts in schedule.TrainStops)
                {
                    // Check if dropStation is included in the schedule.Stations
                    if (ts.TrainStop.Name.Contains(req.Booking.PickStation))
                    {
                        startStationOrderNo = ts.TrainStop.Order + 1;
                    }
                }
            }
            else
            {
                throw new Exception("Invalide Pick Station");
            }

            if (route.EndStation == req.Booking.DropStation)
            {
                endStationOrderNo = route.Stations.Count > 0 ? 2 : route.Stations.Count + 1;
            }
            else if (schedule.TrainStops.Count > 0)
            {
                foreach (var ts in schedule.TrainStops)
                {
                    // Check if dropStation is included in the schedule.Stations
                    if (ts.TrainStop.Name.Contains(req.Booking.DropStation))
                    {
                        endStationOrderNo = ts.TrainStop.Order + 1;
                    }
                }
            }
            else
            {
                throw new Exception("Invalide Drop Station");
            }


            if (startStationOrderNo == 0 || endStationOrderNo == 0)
            {
                throw new Exception("Invalide Drop Station or Pick Station");
            }

            if (startStationOrderNo > endStationOrderNo)
            {
                throw new Exception("Invalide Drop Station or Pick Station");
            }

            // Calculate the number of numbers between startStationOrderNo and endStationOrderNo
            int numberOfNumbersBetween = Math.Abs(endStationOrderNo - startStationOrderNo);
            numberOfNumbersBetween++;


            Booking book = new()
            {
                Id = GenerateRandomString(25),
                CreatedAt = DateTime.Now,
                CreatedBy = userId.ToString().Substring(0, 24),
                ScheduleId = req.Booking.ScheduleId,
                PickStation = req.Booking.PickStation,
                DropStation = req.Booking.DropStation,
                TickectCount = req.Booking.TickectCount,
                TickectPrice = CalculateBookingPrice(req.Booking.TickectCount, numberOfNumbersBetween),
                BookingDate = req.Booking.BookingDate,
            };

            Request request = new()
            {
                AgentId = req.AgentId,
                CreatedBy = req.CreatedBy,
                CreatedAt = req.CreatedAt,
                Booking = book,
                IsReqAccepted = false,
                IsDelete = false
            };

            await _repository.CreateRequestAsync(request);

        }

        public async Task UpdateRequest(string reserveId, ObjectId userId, RequestReqDto req)
        {

            if (!ObjectId.TryParse(reserveId, out var reqObjectId))
            {
                throw new Exception("Invalid ID format");
            }
            var exReq = await _repository.GeByIdAsync(reqObjectId) ?? throw new Exception("Invalid request ID"); ;

            if (req.Booking == null)
            {
                throw new Exception("Booking can not be null");
            }

            if (exReq.IsReqAccepted == true)
            {
                throw new Exception("Booking can not be null");
            }

            if (req.Booking.BookingDate > DateTime.Today.AddDays(30))
            {
                throw new Exception("Booking date must be within 30 days arround");
            }

            if (!ObjectId.TryParse(req.Booking.ScheduleId, out var sheduleObjectId))
            {
                throw new Exception("Invalid ID format");
            }

            var schedule = await _trainScheduleRepository.GetAllByIdAsync(sheduleObjectId) ?? throw new Exception("Invalid Schedule ID");

            if (!ObjectId.TryParse(schedule.TrainRouteId, out var routeObjectId))
            {
                throw new Exception("Invalid ID format");
            }

            var route = await _trainRoutesRepository.GetById(routeObjectId) ?? throw new Exception("Invalid route ID");

            int startStationOrderNo = 0;
            int endStationOrderNo = 0;

            if (route.StartStation == req.Booking.PickStation)
            {
                startStationOrderNo = 1;
            }
            else if (schedule.TrainStops.Count > 0)
            {
                foreach (var ts in schedule.TrainStops)
                {
                    // Check if dropStation is included in the schedule.Stations
                    if (ts.TrainStop.Name.Contains(req.Booking.PickStation))
                    {
                        startStationOrderNo = ts.TrainStop.Order + 1;
                    }
                }
            }
            else
            {
                throw new Exception("Invalide Pick Station");
            }

            if (route.EndStation == req.Booking.DropStation)
            {
                endStationOrderNo = route.Stations.Count > 0 ? 2 : route.Stations.Count + 1;
            }
            else if (schedule.TrainStops.Count > 0)
            {
                foreach (var ts in schedule.TrainStops)
                {
                    // Check if dropStation is included in the schedule.Stations
                    if (ts.TrainStop.Name.Contains(req.Booking.DropStation))
                    {
                        endStationOrderNo = ts.TrainStop.Order + 1;
                    }
                }
            }
            else
            {
                throw new Exception("Invalide Drop Station");
            }


            if (startStationOrderNo == 0 || endStationOrderNo == 0)
            {
                throw new Exception("Invalide Drop Station or Pick Station");
            }

            if (startStationOrderNo > endStationOrderNo)
            {
                throw new Exception("Invalide Drop Station or Pick Station");
            }

            // Calculate the number of numbers between startStationOrderNo and endStationOrderNo
            int numberOfNumbersBetween = Math.Abs(endStationOrderNo - startStationOrderNo);
            numberOfNumbersBetween++;


            Booking book = new()
            {
                Id = exReq.Booking.Id,
                CreatedAt = exReq.Booking.CreatedAt,
                CreatedBy = exReq.Booking.CreatedBy,
                ScheduleId = exReq.Booking.ScheduleId,
                PickStation = req.Booking.PickStation,
                DropStation = req.Booking.DropStation,
                TickectCount = req.Booking.TickectCount,
                TickectPrice = CalculateBookingPrice(req.Booking.TickectCount, numberOfNumbersBetween),
                BookingDate = req.Booking.BookingDate,
            };

            Request request = new()
            {
                AgentId = exReq.AgentId,
                CreatedBy = exReq.CreatedBy,
                CreatedAt = exReq.CreatedAt,
                Booking = book,
                IsReqAccepted = false,
                IsDelete = false
            };

            await _repository.CreateRequestAsync(request);
        }

        public async Task DeleteRequest(string reserveId)
        {

            if (!ObjectId.TryParse(reserveId, out var reqObjectId))
            {
                throw new Exception("Invalid ID format");
            }
            var exReq = await _repository.GeByIdAsync(reqObjectId) ?? throw new Exception("Invalid request ID");

            if (exReq.IsReqAccepted == true)
            {
                throw new Exception("Request can not delete");
            }

            await _repository.DeleteReservationAsync(reqObjectId);
        }

        public async Task<List<RequestResDto>> GetAllRequestsByOwnerID(string userId)
        {
            List<RequestResDto> requestResDtos = new();

            var exReq = await _repository.GetAllRequestsByCreatedByAsync(userId) ?? throw new Exception("Invalid User ID");

            if (exReq.Count > 0)
            {
                foreach (var exr in exReq)
                {
                    if (!ObjectId.TryParse(exr.Booking.ScheduleId, out var objectId))
                    {
                        throw new Exception("Invalid ID format");
                    }
                    var schedule = await _trainScheduleRepository.GetAllByIdAsync(objectId);
                    if (!ObjectId.TryParse(schedule.TrainRouteId, out var routeObjectId))
                    {
                        throw new Exception("Invalid ID format");
                    }
                    var route = await _trainRoutesRepository.GetById(routeObjectId);
                    DateTime today = DateTime.Today;
                    bool isCancelledToday = schedule.CancelDates?.Any(date => date.Date == today) ?? false;
                    TrainScheduleResDto trainScheduleResDto = new()
                    {
                        Id = schedule.Id.ToString().Substring(0, 24),
                        DayType = schedule.DayType,
                        StartStation = route.StartStation,
                        EndStation = route.EndStation,
                        TrainStops = schedule.TrainStops,
                        StartTime = schedule.StartTime,
                        EndTime = schedule.EndTime,
                        TrainClasses = schedule.TrainClasses,
                        CancelDates = schedule.CancelDates,
                        IsCancelledToday = isCancelledToday,
                        Speed = schedule.Speed
                    };


                    var train = await _trainRepository.GetByRegistraionNoAsync(schedule.TraingRegistraionNo);
                    TrainsForTraverDto trainsForTraverDto = new()
                    {
                        Id = train.Id.ToString().Substring(0, 24),
                        Name = train.Name,
                        RegistraionNo = train.RegistraionNo,
                        ImagePath = train.ImagePath
                    };

                    BookingResDto bookingResDto = new()
                    {
                        Id = exr.Booking.Id,
                        CreatedAt = exr.Booking.CreatedAt,
                        CreatedBy = exr.Booking.CreatedBy,
                        ScheduleId = exr.Booking.ScheduleId,
                        ScheduleDetails = trainScheduleResDto,
                        TrainDetails = trainsForTraverDto,
                        PickStation = exr.Booking.PickStation,
                        DropStation = exr.Booking.DropStation,
                        BookingDate = exr.Booking.BookingDate,
                        TickectCount = exr.Booking.TickectCount,
                        TickectPrice = exr.Booking.TickectPrice,
                    };

                    if (!ObjectId.TryParse(exr.AgentId, out var agentObjectId))
                    {
                        throw new Exception("Invalid ID format");
                    }
                    var agent = await _userRepository.GetByIdAsync(agentObjectId) ?? throw new Exception("Invalid User ID");
                    UserDto agentDto = new(agent.Id.ToString().Substring(0, 24), agent.Name, agent.Role, agent.NIC, agent.ImagePath, agent.ContactNo, agent.IsActive, agent.IsSendActiveStatus, agent.Email);

                    if (!ObjectId.TryParse(exr.CreatedBy, out var createdByObjectId))
                    {
                        throw new Exception("Invalid ID format");
                    }
                    var createdBy = await _userRepository.GetByIdAsync(createdByObjectId) ?? throw new Exception("Invalid User ID");
                    UserDto createdByDto = new(createdBy.Id.ToString().Substring(0, 24), createdBy.Name, createdBy.Role, createdBy.NIC, createdBy.ImagePath, createdBy.ContactNo, createdBy.IsActive, createdBy.IsSendActiveStatus, createdBy.Email);


                    RequestResDto requestResDto = new()
                    {
                        Id = exr.Id.ToString().Substring(0, 24),
                        AgentId = exr.AgentId,
                        AgentDetails = agentDto,
                        CreatedBy = exr.CreatedBy,
                        CreatedByDetails = createdByDto,
                        CreatedAt = exr.CreatedAt,
                        Booking = bookingResDto,
                        IsReqAccepted = exr.IsReqAccepted,

                    };
                    requestResDtos.Add(requestResDto);
                }
            }
            return requestResDtos;
        }

        public async Task<List<RequestResDto>> GetAllRequestsByAgentId(string userId)
        {
            List<RequestResDto> requestResDtos = new();

            var exReq = await _repository.GetAllNotAcceptedRequestsByAgentIDAsync(userId) ?? throw new Exception("Invalid User ID");

            if (exReq.Count > 0)
            {
                foreach (var exr in exReq)
                {
                    if (!ObjectId.TryParse(exr.Booking.ScheduleId, out var objectId))
                    {
                        throw new Exception("Invalid ID format");
                    }
                    var schedule = await _trainScheduleRepository.GetAllByIdAsync(objectId);
                    if (!ObjectId.TryParse(schedule.TrainRouteId, out var routeObjectId))
                    {
                        throw new Exception("Invalid ID format");
                    }
                    var route = await _trainRoutesRepository.GetById(routeObjectId);
                    DateTime today = DateTime.Today;
                    bool isCancelledToday = schedule.CancelDates?.Any(date => date.Date == today) ?? false;
                    TrainScheduleResDto trainScheduleResDto = new()
                    {
                        Id = schedule.Id.ToString().Substring(0, 24),
                        DayType = schedule.DayType,
                        StartStation = route.StartStation,
                        EndStation = route.EndStation,
                        TrainStops = schedule.TrainStops,
                        StartTime = schedule.StartTime,
                        EndTime = schedule.EndTime,
                        TrainClasses = schedule.TrainClasses,
                        CancelDates = schedule.CancelDates,
                        IsCancelledToday = isCancelledToday,
                        Speed = schedule.Speed
                    };


                    var train = await _trainRepository.GetByRegistraionNoAsync(schedule.TraingRegistraionNo);
                    TrainsForTraverDto trainsForTraverDto = new()
                    {
                        Id = train.Id.ToString().Substring(0, 24),
                        Name = train.Name,
                        RegistraionNo = train.RegistraionNo,
                        ImagePath = train.ImagePath
                    };

                    BookingResDto bookingResDto = new()
                    {
                        Id = exr.Booking.Id,
                        CreatedAt = exr.Booking.CreatedAt,
                        CreatedBy = exr.Booking.CreatedBy,
                        ScheduleId = exr.Booking.ScheduleId,
                        ScheduleDetails = trainScheduleResDto,
                        TrainDetails = trainsForTraverDto,
                        PickStation = exr.Booking.PickStation,
                        DropStation = exr.Booking.DropStation,
                        BookingDate = exr.Booking.BookingDate,
                        TickectCount = exr.Booking.TickectCount,
                        TickectPrice = exr.Booking.TickectPrice,
                    };

                    if (!ObjectId.TryParse(exr.AgentId, out var agentObjectId))
                    {
                        throw new Exception("Invalid ID format");
                    }
                    var agent = await _userRepository.GetByIdAsync(agentObjectId) ?? throw new Exception("Invalid User ID");
                    UserDto agentDto = new(agent.Id.ToString().Substring(0, 24), agent.Name, agent.Role, agent.NIC, agent.ImagePath, agent.ContactNo, agent.IsActive, agent.IsSendActiveStatus, agent.Email);

                    if (!ObjectId.TryParse(exr.CreatedBy, out var createdByObjectId))
                    {
                        throw new Exception("Invalid ID format");
                    }
                    var createdBy = await _userRepository.GetByIdAsync(createdByObjectId) ?? throw new Exception("Invalid User ID");
                    UserDto createdByDto = new(createdBy.Id.ToString().Substring(0, 24), createdBy.Name, createdBy.Role, createdBy.NIC, createdBy.ImagePath, createdBy.ContactNo, createdBy.IsActive, createdBy.IsSendActiveStatus, createdBy.Email);


                    RequestResDto requestResDto = new()
                    {
                        Id = exr.Id.ToString().Substring(0, 24),
                        AgentId = exr.AgentId,
                        AgentDetails = agentDto,
                        CreatedBy = exr.CreatedBy,
                        CreatedByDetails = createdByDto,
                        CreatedAt = exr.CreatedAt,
                        Booking = bookingResDto,
                        IsReqAccepted = exr.IsReqAccepted,

                    };
                    requestResDtos.Add(requestResDto);
                }
            }
            return requestResDtos;
        }

        private static float CalculateBookingPrice(double noOfPersons, int trainStops)
        {
            // Define the minimum price per person
            float minPrice = 5;
            float initPrice = 20;


            float totalPrice = (float)((trainStops - 1 * minPrice) + initPrice);

            // Adjust the total price
            totalPrice *= (float)noOfPersons;

            return totalPrice;
        }

        private static string GenerateRandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            StringBuilder sb = new(length);

            for (int i = 0; i < length; i++)
            {
                int index = random.Next(chars.Length);
                sb.Append(chars[index]);
            }

            return sb.ToString();
        }
    }
}
