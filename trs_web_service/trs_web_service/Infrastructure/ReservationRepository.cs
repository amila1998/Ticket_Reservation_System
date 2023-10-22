/// Infrastructure/ReservationRepository.cs

using MongoDB.Bson;
using MongoDB.Driver;
using trs_web_service.Models.Domains;

namespace trs_web_service.Infrastructure
{
    public class ReservationRepository
    {
        private readonly IMongoCollection<Reservation> _collection;

        public ReservationRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<Reservation>("Reservations");
        }

        /// <summary>
        /// Create a reservation asynchronously.
        /// </summary>
        public async Task CreateReservationAsync(Reservation reservation)
        {
            await _collection.InsertOneAsync(reservation);
        }

        /// <summary>
        /// Get all reservations by owner ID asynchronously.
        /// </summary>
        public async Task<List<Reservation>> GetAllReservationsByOwnerIdAsync(string ownerId)
        {
            var filter = Builders<Reservation>.Filter.Eq(r => r.OwnerId, ownerId);
            return await _collection.Find(filter).ToListAsync();
        }

        /// <summary>
        /// Get all reservations by created by user asynchronously.
        /// </summary>
        public async Task<List<Reservation>> GetAllReservationsByCreatedByAsync(string createdBy)
        {
            var filter = Builders<Reservation>.Filter.ElemMatch(
                r => r.Bookings,
                b => b.CreatedBy == createdBy
            );

            return await _collection.Find(filter).ToListAsync();
        }

        /// <summary>
        /// Update a reservation asynchronously.
        /// </summary>
        public async Task UpdateReservationAsync(Reservation updatedReservation)
        {
            var filter = Builders<Reservation>.Filter.Eq(r => r.Id, updatedReservation.Id);
            var update = Builders<Reservation>.Update
                .Set(r => r.UpdatedAt, updatedReservation.UpdatedAt)
                .Set(r => r.Bookings, updatedReservation.Bookings)
                .Set(r => r.TotalPrice, updatedReservation.TotalPrice);

            await _collection.UpdateOneAsync(filter, update);
        }

        /// <summary>
        /// Delete a reservation asynchronously.
        /// </summary>
        public async Task DeleteReservationAsync(ObjectId reservationId)
        {
            var filter = Builders<Reservation>.Filter.Eq(r => r.Id, reservationId);
            await _collection.DeleteOneAsync(filter);
        }

        /// <summary>
        /// Get all reservations by schedule ID asynchronously.
        /// </summary>
        public async Task<List<Reservation>> GetReservationsByScheduleIdAsync(string scheduleId)
        {
            var filter = Builders<Reservation>.Filter.Eq(r => r.Bookings.Any(b => b.ScheduleId == scheduleId), true);
            return await _collection.Find(filter).ToListAsync();
        }

        /// <summary>
        /// Get a reservation by its ID asynchronously.
        /// </summary>
        public async Task<Reservation> GetReservationsByIdAsync(ObjectId id)
        {
            return await _collection.Find(t => t.Id == id).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Get all valid reservations by schedule ID asynchronously.
        /// </summary>
        public async Task<List<Reservation>> GetValidReservationsByScheduleIdAsync(string scheduleId)
        {
            var filter = Builders<Reservation>.Filter.And(
                Builders<Reservation>.Filter.Eq(r => r.Bookings.Any(b => b.ScheduleId == scheduleId), true),
                Builders<Reservation>.Filter.Gte(r => r.ValidDate, DateTime.UtcNow)
            );

            return await _collection.Find(filter).ToListAsync();
        }

        /// <summary>
        /// Get all reservations asynchronously.
        /// </summary>
        public async Task<List<Reservation>> GetAllReservationsAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        /// <summary>
        /// Get all reservations created at least 5 days before the specified date by owner ID asynchronously.
        /// </summary>
        public async Task<List<Reservation>> GetAllReservationsCreatedBeforByOwnerIdAsync(string ownerId)
        {
            DateTime referenceDate = DateTime.UtcNow;
            DateTime fiveDaysBeforeReference = referenceDate.AddDays(-5);

            var filter = Builders<Reservation>.Filter.Lte(r => r.CreatedAt, fiveDaysBeforeReference) &
                Builders<Reservation>.Filter.Eq(r => r.OwnerId, ownerId);

            return await _collection.Find(filter).ToListAsync();
        }

        /// <summary>
        /// Validate a reservation for deletion or update based on the reservation ID asynchronously.
        /// </summary>
        public async Task<bool> GetValidationForDeleteOrUpateReservationAsync(ObjectId reservationId)
        {
            var filter = Builders<Reservation>.Filter.Eq(r => r.Id, reservationId);
            var reservation = await _collection.Find(filter).FirstOrDefaultAsync();

            if (reservation == null)
            {
                // Reservation with the given ObjectId not found
                return false;
            }

            DateTime fiveDaysBeforeCurrentDate = DateTime.UtcNow.AddDays(-5);

            return reservation.CreatedAt <= fiveDaysBeforeCurrentDate;
        }
    }
}