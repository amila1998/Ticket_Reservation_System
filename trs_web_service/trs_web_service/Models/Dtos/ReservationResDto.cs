﻿using MongoDB.Bson;
using trs_web_service.Models.Domains;

namespace trs_web_service.Models.Dtos
{
    public class ReservationResDto
    {
        public string Id { get; set; }
        public DateTime CreatedAt { get; set; }

        public List<BookingDto> Bookings { get; set; }

        public string OwnerId { get; set; }

        public DateTime ValidDate { get; set; }

        public float TotalPrice { get; set; }
    }
}
