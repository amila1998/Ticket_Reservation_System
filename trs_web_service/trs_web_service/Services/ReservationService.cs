/// Services/ReservationService.cs

using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc.Formatters;
using MongoDB.Bson;
using Org.BouncyCastle.Ocsp;
using Org.BouncyCastle.Security;
using System.Runtime.InteropServices;
using System.Text;
using System.Xml.Linq;
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
        private readonly UserRepository _userRepository;

        private static readonly Random random = new Random();
        public ReservationService(ReservationRepository repository, TrainScheduleRepository rainScheduleRepository, TrainRoutesRepository trainRoutesRepository, TrainRepository trainRepository, UserRepository userRepository )
        {
            _repository = repository;
            _trainScheduleRepository = rainScheduleRepository;
            _trainRoutesRepository = trainRoutesRepository;
            _trainRepository = trainRepository;
            _userRepository = userRepository;
        }


        /// <summary>
        /// Create a New Reservation
        /// </summary>
        /// <param ReservationReqDto and User Id></param>
        /// <returns>Id</returns>
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

            // Calculate the reservation valid time by adding 30 days tote today
            DateTime reservationValidTime = DateTime.Today.AddDays(30);

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


        /// <summary>
        /// Update a  Reservation
        /// </summary>
        /// <param ReservationReqDto and User Id and reservation Id></param>
        /// <returns>Id</returns>
        public async Task UpdateReservation(string reserveId, ObjectId userId, ReservationReqDto req)
        {
            if (!ObjectId.TryParse(reserveId, out var reservObjectId))
            {
                throw new Exception("Invalid ID format");
            }
            var exReservation = await _repository.GetReservationsByIdAsync(reservObjectId) ?? throw new Exception("Invalid Reservation ID"); ;
            var bookingCount = req.Bookings.Count();
            if (bookingCount > 4)
            {
                throw new Exception("Can not assign booking more than 4");
            }

            List<Booking> bookList = new();
            foreach (var book in req.Bookings)
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

                if (route.StartStation == book.PickStation)
                {
                    startStationOrderNo = 1;
                }
                else if (schedule.TrainStops.Count > 0)
                {
                    foreach (var ts in schedule.TrainStops)
                    {
                        // Check if dropStation is included in the schedule.Stations
                        if (ts.TrainStop.Name.Contains(book.PickStation))
                        {
                            startStationOrderNo = ts.TrainStop.Order + 1;
                        }
                    }
                }
                else
                {
                    throw new Exception("Invalide Pick Station");
                }

                if (route.EndStation == book.DropStation)
                {
                    endStationOrderNo = route.Stations.Count > 0 ? 2 : route.Stations.Count + 1;
                }
                else if (schedule.TrainStops.Count > 0)
                {
                    foreach (var ts in schedule.TrainStops)
                    {
                        // Check if dropStation is included in the schedule.Stations
                        if (ts.TrainStop.Name.Contains(book.DropStation))
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

                // Validate that BookingDate is less than or equal to reservation Valid Date
                if (book.BookingDate > exReservation.ValidDate)
                {
                    throw new Exception("BookingDate cannot be greater than the ValidDate of the reservation.");
                }

                bool isExBooking = false;

                foreach (var exBook in exReservation.Bookings)
                {
                    if(book.Id == exBook.Id)
                    {
                        isExBooking = true;
                    }else
                    {
                        isExBooking = false;
                    }
                }

                Booking b = new()
                {
                    Id = isExBooking ? book.Id : GenerateRandomString(25),
                    CreatedAt = isExBooking ? book.CreatedAt:DateTime.Now,
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
                Id = reservObjectId,
                CreatedAt = exReservation.CreatedAt,
                UpdatedAt = DateTime.Now,
                Bookings = bookList,
                OwnerId = req.OwnerId,
                ValidDate = exReservation.ValidDate,
                TotalPrice = totalPrice,
            };
            await _repository.UpdateReservationAsync(reservation);
        }


        /// <summary>
        /// Get Calculated Booking Price
        /// </summary>
        /// <param CalculatePriceReqDto></param>
        /// <returns>calculated Price</returns>
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


        /// <summary>
        /// Get Edit enable Reservation List 
        /// </summary>
        /// <param Owner Id></param>
        /// <returns>List<ReservationResDto></returns>
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


        /// <summary>
        /// Get  Reservation List  by owner ID
        /// </summary>
        /// <param Owner Id></param>
        /// <returns>List<ReservationResDto></returns>
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


                            if (!ObjectId.TryParse(booking.CreatedBy, out var userObjectId))
                            {
                                throw new Exception("Invalid ID format");
                            }

                            var createdByUser =await  _userRepository.GetByIdAsync(userObjectId);
                            UserDto userDto = new(createdByUser.Id.ToString().Substring(0, 24), createdByUser.Name, createdByUser.Role, createdByUser.NIC, createdByUser.ImagePath, createdByUser.ContactNo, createdByUser.IsActive, createdByUser.IsSendActiveStatus, createdByUser.Email);
                            

                            BookingResDto bookingResDto = new()
                            {
                                Id = booking.Id,
                                CreatedAt = booking.CreatedAt,
                                CreatedBy = booking.CreatedBy,
                                ScheduleId = booking.ScheduleId,
                                ScheduleDetails = trainScheduleResDto,
                                CreatedByDetails = userDto,
                                TrainDetails = trainsForTraverDto,
                                PickStation = booking.PickStation,
                                DropStation = booking.DropStation,
                                BookingDate = booking.BookingDate,
                                TickectCount = booking.TickectCount,
                                TickectPrice = booking.TickectPrice,
                            };
                            bookingResDtos.Add(bookingResDto);
                        }

                        if (!ObjectId.TryParse(r.OwnerId, out var userObjectId2))
                        {
                            throw new Exception("Invalid ID format");
                        }
                        var owner = await _userRepository.GetByIdAsync(userObjectId2);
                        UserDto ownerDetails = new(owner.Id.ToString().Substring(0, 24), owner.Name, owner.Role, owner.NIC, owner.ImagePath, owner.ContactNo, owner.IsActive, owner.IsSendActiveStatus, owner.Email);


                        ReservationResDto reservationResDto = new()
                        {
                            Id = r.Id.ToString().Substring(0, 24),
                            CreatedAt = r.CreatedAt,
                            Bookings = bookingResDtos,
                            OwnerId = r.OwnerId,
                            OwnerDetails= ownerDetails,
                            ValidDate = r.ValidDate,
                            TotalPrice = r.TotalPrice,
                        };
                        reservationList.Add(reservationResDto);
                    }
                }
            }

            return reservationList;

        }


        /// <summary>
        /// Get  Reservation List by who created
        /// </summary>
        /// <param User Id></param>
        /// <returns>List<ReservationResDto></returns>
        public async Task<List<ReservationResDto>> GetAllReservationsByCreatedByAsync(string userId)
        {
            List<ReservationResDto> reservationList = new();
            var reserv = await _repository.GetAllReservationsByCreatedByAsync(userId);
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

                            if (!ObjectId.TryParse(booking.CreatedBy, out var userObjectId))
                            {
                                throw new Exception("Invalid ID format");
                            }
                            var createdByUser = await _userRepository.GetByIdAsync(userObjectId);
                            UserDto userDto = new(createdByUser.Id.ToString().Substring(0, 24), createdByUser.Name, createdByUser.Role, createdByUser.NIC, createdByUser.ImagePath, createdByUser.ContactNo, createdByUser.IsActive, createdByUser.IsSendActiveStatus, createdByUser.Email);

                            BookingResDto bookingResDto = new()
                            {
                                Id = booking.Id,
                                CreatedAt = booking.CreatedAt,
                                CreatedBy = booking.CreatedBy,
                                ScheduleId = booking.ScheduleId,
                                ScheduleDetails = trainScheduleResDto,
                                TrainDetails = trainsForTraverDto,
                                CreatedByDetails = userDto,
                                PickStation = booking.PickStation,
                                DropStation = booking.DropStation,
                                BookingDate = booking.BookingDate,
                                TickectCount = booking.TickectCount,
                                TickectPrice = booking.TickectPrice,
                            };
                            bookingResDtos.Add(bookingResDto);
                        }
                        if (!ObjectId.TryParse(r.OwnerId, out var userObjectId2))
                        {
                            throw new Exception("Invalid ID format");
                        }
                        var owner = await _userRepository.GetByIdAsync(userObjectId2);
                        UserDto ownerDetails = new(owner.Id.ToString().Substring(0, 24), owner.Name, owner.Role, owner.NIC, owner.ImagePath, owner.ContactNo, owner.IsActive, owner.IsSendActiveStatus, owner.Email);

                        ReservationResDto reservationResDto = new()
                        {
                            Id = r.Id.ToString().Substring(0, 24),
                            CreatedAt = r.CreatedAt,
                            Bookings = bookingResDtos,
                            OwnerDetails = ownerDetails,
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


        /// <summary>
        /// method to calculate the booking price
        /// </summary>
        /// <param no of persons and train stop count></param>
        /// <returns>Total Price</returns>
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


        /// <summary>
        /// Generate a random Unique Id
        /// </summary>
        /// <paramlength></param>
        /// <returns>ID</returns>
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

        /// <summary>
        /// Delete a reservation
        /// </summary>
        /// <param reservation Id></param>
        /// <returns></returns>
        public async Task Delete(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                throw new Exception("Invalid ID format");
            }
            var exReservation = await _repository.GetReservationsByIdAsync(objectId) ?? throw new Exception("Invalid Reservation ID");
            if(exReservation.ValidDate > DateTime.UtcNow)
            {
                throw new Exception("Can not delete that because valid time exceeded");
            }
            var bookingCount = exReservation.Bookings.Count();
            if (bookingCount > 0)
            {
                foreach(var book in exReservation.Bookings)
                {
                    if(DateTime.UtcNow == book.CreatedAt.AddDays(6))
                    {
                        throw new Exception("Can not delete that because one of booking exceeded greater than 5 days");
                    }

                }
            }

            await _repository.DeleteReservationAsync(objectId);

        }
    }
}
