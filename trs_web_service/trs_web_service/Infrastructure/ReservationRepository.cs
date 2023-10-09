﻿using MongoDB.Bson;
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

        // Create Reservation
        public async Task CreateReservationAsync(Reservation reservation)
        {
            await _collection.InsertOneAsync(reservation);
        }

        // Get all Reservations by OwnerId
        public async Task<List<Reservation>> GetAllReservationsByOwnerIdAsync(string ownerId)
        {
            var filter = Builders<Reservation>.Filter.Eq(r => r.OwnerId, ownerId);
            return await _collection.Find(filter).ToListAsync();
        }

        // Update Reservation
        public async Task UpdateReservationAsync(ObjectId reservationId, Reservation updatedReservation)
        {
            var filter = Builders<Reservation>.Filter.Eq(r => r.Id, reservationId);
            var update = Builders<Reservation>.Update
                .Set(r => r.ValidDate, updatedReservation.ValidDate)
                .Set(r => r.TotalPrice, updatedReservation.TotalPrice);

            await _collection.UpdateOneAsync(filter, update);
        }

        // Delete Reservation
        public async Task DeleteReservationAsync(ObjectId reservationId)
        {
            var filter = Builders<Reservation>.Filter.Eq(r => r.Id, reservationId);
            await _collection.DeleteOneAsync(filter);
        }

        // Get all Reservations by ScheduleId
        public async Task<List<Reservation>> GetReservationsByScheduleIdAsync(string scheduleId)
        {
            var filter = Builders<Reservation>.Filter.Eq(r => r.Bookings.Any(b => b.ScheduleId == scheduleId), true);
            return await _collection.Find(filter).ToListAsync();
        }

        // Get all Valid Reservations by ScheduleId
        public async Task<List<Reservation>> GetValidReservationsByScheduleIdAsync(string scheduleId)
        {
            var filter = Builders<Reservation>.Filter.And(
                Builders<Reservation>.Filter.Eq(r => r.Bookings.Any(b => b.ScheduleId == scheduleId), true),
                Builders<Reservation>.Filter.Gte(r => r.ValidDate, DateTime.UtcNow) // Check for valid reservations
            );

            return await _collection.Find(filter).ToListAsync();
        }

        // Get all Reservations
        public async Task<List<Reservation>> GetAllReservationsAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }
    }
}
