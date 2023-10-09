using Amazon.Auth.AccessControlPolicy;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Security.Claims;
using trs_web_service.Models.Dtos;
using trs_web_service.Services;

namespace trs_web_service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationService _service;

        public ReservationController(ReservationService service)
        {
            _service = service;
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(ReservationReqDto req)
        {
            try
            {
                var userIdentity = User.Identity as ClaimsIdentity;

                // Retrieve the user's ID and role from the claims
                var userId = userIdentity.FindFirst(ClaimTypes.Name)?.Value;
                if (!ObjectId.TryParse(userId, out var objectId))
                {
                    throw new Exception("Invalid ID format");
                }
                await _service.CreateReservation(req, objectId);
                return Ok("Reservation created");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }

        [Authorize]
        [HttpPost("getBookingPrice")]
        public async Task<IActionResult> GetBookingPrice(CalculatePriceReqDto req)
        {
            try
            {
                float total = await _service.GetCalculateBookingPrice(req);
                return Ok(total);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize]
        [HttpGet("getExitEditEnableReservations/{ownerId}")]
        public async Task<IActionResult> GetExitEditEnableReservations(string ownerId)
        {
            try
            {
                var reservations = await _service.GetExitEditEnableReservations(ownerId);
                return Ok(reservations);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
