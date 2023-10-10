using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc.Formatters;
using MongoDB.Bson;
using Org.BouncyCastle.Ocsp;
using Org.BouncyCastle.Security;
using System.Text;
using trs_web_service.Infrastructure;
using trs_web_service.Models.Domains;
using trs_web_service.Models.Dtos;

namespace trs_web_service.Services
{
    public class ReservationService
    {
        private readonly ReservationRepository _repository;
        private readonly TrainScheduleRepository _trainScheduleRepository;
        private readonly TrainRoutesRepository _trainRoutesRepository;
        private readonly TrainRepository _trainRepository;

        private static readonly Random random = new Random();
        public ReservationService(ReservationRepository repository, TrainScheduleRepository rainScheduleRepository, TrainRoutesRepository trainRoutesRepository, TrainRepository trainRepository )
        {
            _repository = repository;
            _trainScheduleRepository = rainScheduleRepository;
            _trainRoutesRepository = trainRoutesRepository;
            _trainRepository = trainRepository;
        }

        public async Task CreateReservation(ReservationReqDto req, ObjectId userId)
        {
            var bookingCount = req.Bookings.Count();
            if(bookingCount > 4)
            {
                throw new Exception("Can not assign booking more than 4");
            }

            List<Booking> bookList = new();
            foreach(var book in req.Bookings)
            {
                if (!ObjectId.TryParse(book.ScheduleId, out var objectId))
                {
                    throw new Exception("Invalid ID format");
                }

                var schedule = await _trainScheduleRepository.GetAllByIdAsync(objectId) ?? throw new Exception("Invalid Schedule ID");

                if (!ObjectId.TryParse(schedule.TrainRouteId, out var routeObjectId))
                {
                    throw new Exception("Invalid ID format");
                }

                var route = await _trainRoutesRepository.GetById(routeObjectId) ?? throw new Exception("Invalid route ID");

                int startStationOrderNo = 0;
                int endStationOrderNo = 0;

                if(route.StartStation == book.PickStation)
                {
                    startStationOrderNo = 1;
                }
                else if (schedule.TrainStops.Count > 0)
                {
                    foreach(var ts in schedule.TrainStops)
                    {
                        // Check if dropStation is included in the schedule.Stations
                        if (ts.TrainStop.Name.Contains(book.PickStation))
                        {
                            startStationOrderNo = ts.TrainStop.Order+1;
                        }
                    }
                } else
                {
                    throw new Exception("Invalide Pick Station");
                }

                if (route.EndStation == book.DropStation)
                {
                    endStationOrderNo = route.Stations.Count > 0 ? 2: route.Stations.Count + 1;
                } else if (schedule.TrainStops.Count > 0)
                {
                    foreach (var ts in schedule.TrainStops)
                    {
                        // Check if dropStation is included in the schedule.Stations
                        if (ts.TrainStop.Name.Contains(book.DropStation))
                        {
                            endStationOrderNo = ts.TrainStop.Order+1;
                        }
                    }
                }
                else
                {
                    throw new Exception("Invalide Drop Station");
                }


                if(startStationOrderNo == 0 || endStationOrderNo == 0)
                {
                    throw new Exception("Invalide Drop Station or Pick Station");
                }

                if(startStationOrderNo > endStationOrderNo)
                {
                    throw new Exception("Invalide Drop Station or Pick Station");
                }

                // Calculate the number of numbers between startStationOrderNo and endStationOrderNo
                int numberOfNumbersBetween = Math.Abs(endStationOrderNo - startStationOrderNo);
                numberOfNumbersBetween++;

                //get max booked date
                DateTime maxBookingDate = req.Bookings.Max(booking => booking.BookingDate);

                // Calculate the reservation valid time by adding 30 days to maxDate
                DateTime resrveValidTime = maxBookingDate.AddDays(30);

                // Validate that BookingDate is less than or equal to reservationValidTime
                if (book.BookingDate > resrveValidTime)
                {
                    throw new Exception("BookingDate cannot be greater than the ValidDate of the reservation.");
                }


                Booking b = new()
                {
                    Id = GenerateRandomString(25),
                    CreatedAt = DateTime.Now,
                    CreatedBy = userId.ToString().Substring(0, 24),
                    ScheduleId = book.ScheduleId,
                    PickStation = book.PickStation,
                    DropStation = book.DropStation,
                    TickectCount = book.TickectCount,
                    TickectPrice = CalculateBookingPrice(book.TickectCount, numberOfNumbersBetween),
                    BookingDate = book.BookingDate,
                };
                bookList.Add(b);

            }

            //get max booked date
            DateTime maxDate = req.Bookings.Max(booking => booking.BookingDate);

            // Calculate the reservation valid time by adding 30 days to maxDate
            DateTime reservationValidTime = maxDate.AddDays(30);

            // Calculate the total price by summing the TicketPrice of all bookings
            float totalPrice = 0;
            foreach (var booking in bookList)
            {
                if (booking is Booking book)
                {
                    totalPrice += book.TickectPrice;
                }
            }

            Reservation reservation = new()
            {
                CreatedAt = DateTime.Now,
                UpdatedAt= DateTime.Now,
                Bookings = bookList,
                OwnerId = req.OwnerId,
                ValidDate = reservationValidTime,
                TotalPrice = totalPrice,
            };
            await _repository.CreateReservationAsync(reservation);
        }

        public async Task<float> GetCalculateBookingPrice(CalculatePriceReqDto req)
        {

            if (!ObjectId.TryParse(req.ScheduleId, out var objectId))
            {
                throw new Exception("Invalid ID format");
            }

            var schedule = await _trainScheduleRepository.GetAllByIdAsync(objectId) ?? throw new Exception("Invalid Schedule ID");

            if (!ObjectId.TryParse(schedule.TrainRouteId, out var routeObjectId))
            {
                throw new Exception("Invalid ID format");
            }

            var route = await _trainRoutesRepository.GetById(routeObjectId) ?? throw new Exception("Invalid route ID");

            int startStationOrderNo = 0;
            int endStationOrderNo = 0;

            if (route.StartStation == req.PickStation)
            {
                startStationOrderNo = 1;
            }
            else if (schedule.TrainStops.Count > 0)
            {
                foreach (var ts in schedule.TrainStops)
                {
                    // Check if dropStation is included in the schedule.Stations
                    if (ts.TrainStop.Name.Contains(req.PickStation))
                    {
                        startStationOrderNo = ts.TrainStop.Order + 1;
                    }
                }
            }
            else
            {
                throw new Exception("Invalide Pick Station");
            }

            if (route.EndStation == req.DropStation)
            {
                endStationOrderNo = route.Stations.Count > 0 ? 2 : route.Stations.Count + 1;
            }
            else if (schedule.TrainStops.Count > 0)
            {
                foreach (var ts in schedule.TrainStops)
                {
                    // Check if dropStation is included in the schedule.Stations
                    if (ts.TrainStop.Name.Contains(req.DropStation))
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

            // Define the minimum price per person
            float minPrice = 5;
            float initPrice = 20;

            // Calculate the total price by multiplying the number of persons with the minimum price per person
            //float totalPrice = (float)(noOfPersons * minPricePerPerson);
            float totalPrice = (float)((numberOfNumbersBetween - 1 * minPrice)+ initPrice);

            // Adjust the total price based on the number of train stops (if needed)
            totalPrice *= (float)req.NoOfPersons;

            return totalPrice;
        }

        public async Task<List<ReservationResDto>> GetExitEditEnableReservations(string ownerId)
        {
            List<ReservationResDto> reservationList = new();
            var reserv = await _repository.GetAllReservationsCreatedBeforByOwnerIdAsync(ownerId);
            if(reserv.Count > 0)
            {
                foreach(var r in reserv)
                {
                    if(r.Bookings.Count < 4)
                    {
                        List<BookingResDto> bookingResDtos = new();
                        foreach(var booking in r.Bookings)
                        {
                            if (!ObjectId.TryParse(booking.ScheduleId, out var objectId))
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
                                Id=booking.Id,
                                CreatedAt= booking.CreatedAt,
                                CreatedBy= booking.CreatedBy,
                                ScheduleId= booking.ScheduleId,
                                ScheduleDetails = trainScheduleResDto,
                                TrainDetails = trainsForTraverDto,
                                PickStation= booking.PickStation,
                                DropStation= booking.DropStation,
                                BookingDate = booking.BookingDate,
                                TickectCount = booking.TickectCount,
                                TickectPrice= booking.TickectPrice,
                            };
                            bookingResDtos.Add(bookingResDto);
                        }

                        ReservationResDto reservationResDto = new()
                        {
                            Id= r.Id.ToString().Substring(0, 24),
                            CreatedAt = r.CreatedAt,
                            Bookings = bookingResDtos,
                            OwnerId = r.OwnerId,
                            ValidDate = r.ValidDate,
                            TotalPrice = r.TotalPrice,
                        };
                        reservationList.Add(reservationResDto);
                    }
                }
            }

            return reservationList;

        }

        public async Task<List<ReservationResDto>> GetAllReservationsByOwnerIdAsync(string ownerId)
        {
            List<ReservationResDto> reservationList = new();
            var reserv = await _repository.GetAllReservationsByOwnerIdAsync(ownerId);
            if (reserv.Count > 0)
            {
                foreach (var r in reserv)
                {
                    if (r.Bookings.Count < 4)
                    {
                        List<BookingResDto> bookingResDtos = new();
                        foreach (var booking in r.Bookings)
                        {
                            if (!ObjectId.TryParse(booking.ScheduleId, out var objectId))
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
                                Id = booking.Id,
                                CreatedAt = booking.CreatedAt,
                                CreatedBy = booking.CreatedBy,
                                ScheduleId = booking.ScheduleId,
                                ScheduleDetails = trainScheduleResDto,
                                TrainDetails = trainsForTraverDto,
                                PickStation = booking.PickStation,
                                DropStation = booking.DropStation,
                                BookingDate = booking.BookingDate,
                                TickectCount = booking.TickectCount,
                                TickectPrice = booking.TickectPrice,
                            };
                            bookingResDtos.Add(bookingResDto);
                        }

                        ReservationResDto reservationResDto = new()
                        {
                            Id = r.Id.ToString().Substring(0, 24),
                            CreatedAt = r.CreatedAt,
                            Bookings = bookingResDtos,
                            OwnerId = r.OwnerId,
                            ValidDate = r.ValidDate,
                            TotalPrice = r.TotalPrice,
                        };
                        reservationList.Add(reservationResDto);
                    }
                }
            }

            return reservationList;

        }

        private static float CalculateBookingPrice(double noOfPersons, int trainStops)
        {
            // Define the minimum price per person
            float minPrice = 5;
            float initPrice = 20;

            // Calculate the total price by multiplying the number of persons with the minimum price per person
            //float totalPrice = (float)(noOfPersons * minPricePerPerson);
            float totalPrice = (float)((trainStops - 1 * minPrice) + initPrice);

            // Adjust the total price based on the number of train stops (if needed)
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
