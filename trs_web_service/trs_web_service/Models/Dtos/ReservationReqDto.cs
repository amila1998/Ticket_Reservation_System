﻿////Models/Dtos/ReservationReqDto.cs

using MongoDB.Bson;
using trs_web_service.Models.Domains;

namespace trs_web_service.Models.Dtos
{
    public class ReservationReqDto
    {
        public DateTime CreatedAt { get; set; }

        public List<BookingDto> Bookings { get; set; }

        public string OwnerId { get; set; }

        public float TotalPrice { get; set; }
    }
}
