using MongoDB.Bson;
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

        public async Task CreateReservation(RequestReqDto req, ObjectId userId)
        {
;
            if (req.Booking == null)
            {
                throw new Exception("Booking can not be null");
            }

           
        }

        public async Task UpdateReservation(string reserveId, ObjectId userId, ReservationReqDto req)
        {
            //if (!ObjectId.TryParse(reserveId, out var reservObjectId))
            //{
            //    throw new Exception("Invalid ID format");
            //}
            //var exReservation = await _repository.GetReservationsByIdAsync(reservObjectId) ?? throw new Exception("Invalid Reservation ID"); ;
            //var bookingCount = req.Bookings.Count();
            //if (bookingCount > 4)
            //{
            //    throw new Exception("Can not assign booking more than 4");
            //}

            //List<Booking> bookList = new();
            //foreach (var book in req.Bookings)
            //{
            //    if (!ObjectId.TryParse(book.ScheduleId, out var objectId))
            //    {
            //        throw new Exception("Invalid ID format");
            //    }

            //    var schedule = await _trainScheduleRepository.GetAllByIdAsync(objectId) ?? throw new Exception("Invalid Schedule ID");

            //    if (!ObjectId.TryParse(schedule.TrainRouteId, out var routeObjectId))
            //    {
            //        throw new Exception("Invalid ID format");
            //    }

            //    var route = await _trainRoutesRepository.GetById(routeObjectId) ?? throw new Exception("Invalid route ID");

            //    int startStationOrderNo = 0;
            //    int endStationOrderNo = 0;

            //    if (route.StartStation == book.PickStation)
            //    {
            //        startStationOrderNo = 1;
            //    }
            //    else if (schedule.TrainStops.Count > 0)
            //    {
            //        foreach (var ts in schedule.TrainStops)
            //        {
            //            // Check if dropStation is included in the schedule.Stations
            //            if (ts.TrainStop.Name.Contains(book.PickStation))
            //            {
            //                startStationOrderNo = ts.TrainStop.Order + 1;
            //            }
            //        }
            //    }
            //    else
            //    {
            //        throw new Exception("Invalide Pick Station");
            //    }

            //    if (route.EndStation == book.DropStation)
            //    {
            //        endStationOrderNo = route.Stations.Count > 0 ? 2 : route.Stations.Count + 1;
            //    }
            //    else if (schedule.TrainStops.Count > 0)
            //    {
            //        foreach (var ts in schedule.TrainStops)
            //        {
            //            // Check if dropStation is included in the schedule.Stations
            //            if (ts.TrainStop.Name.Contains(book.DropStation))
            //            {
            //                endStationOrderNo = ts.TrainStop.Order + 1;
            //            }
            //        }
            //    }
            //    else
            //    {
            //        throw new Exception("Invalide Drop Station");
            //    }


            //    if (startStationOrderNo == 0 || endStationOrderNo == 0)
            //    {
            //        throw new Exception("Invalide Drop Station or Pick Station");
            //    }

            //    if (startStationOrderNo > endStationOrderNo)
            //    {
            //        throw new Exception("Invalide Drop Station or Pick Station");
            //    }

            //    // Calculate the number of numbers between startStationOrderNo and endStationOrderNo
            //    int numberOfNumbersBetween = Math.Abs(endStationOrderNo - startStationOrderNo);
            //    numberOfNumbersBetween++;

            //    // Validate that BookingDate is less than or equal to reservation Valid Date
            //    if (book.BookingDate > exReservation.ValidDate)
            //    {
            //        throw new Exception("BookingDate cannot be greater than the ValidDate of the reservation.");
            //    }

            //    bool isExBooking = false;

            //    foreach (var exBook in exReservation.Bookings)
            //    {
            //        if (book.Id == exBook.Id)
            //        {
            //            isExBooking = true;
            //        }
            //        else
            //        {
            //            isExBooking = false;
            //        }
            //    }

            //    Booking b = new()
            //    {
            //        Id = isExBooking ? book.Id : GenerateRandomString(25),
            //        CreatedAt = isExBooking ? book.CreatedAt : DateTime.Now,
            //        CreatedBy = userId.ToString().Substring(0, 24),
            //        ScheduleId = book.ScheduleId,
            //        PickStation = book.PickStation,
            //        DropStation = book.DropStation,
            //        TickectCount = book.TickectCount,
            //        TickectPrice = CalculateBookingPrice(book.TickectCount, numberOfNumbersBetween),
            //        BookingDate = book.BookingDate,
            //    };
            //    bookList.Add(b);

            //}

            //// Calculate the total price by summing the TicketPrice of all bookings
            //float totalPrice = 0;
            //foreach (var booking in bookList)
            //{
            //    if (booking is Booking book)
            //    {
            //        totalPrice += book.TickectPrice;
            //    }
            //}


            //Reservation reservation = new()
            //{
            //    Id = reservObjectId,
            //    CreatedAt = exReservation.CreatedAt,
            //    UpdatedAt = DateTime.Now,
            //    Bookings = bookList,
            //    OwnerId = req.OwnerId,
            //    ValidDate = exReservation.ValidDate,
            //    TotalPrice = totalPrice,
            //};
            //await _repository.UpdateReservationAsync(reservation);
        }
    }
}
