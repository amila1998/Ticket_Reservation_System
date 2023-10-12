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
    public class RequestController : ControllerBase
    {
        private readonly RequestService _service;

        public RequestController(RequestService service)
        {
            _service = service;
        }

        [Authorize (Policy = "traveler")]
        [HttpPost]
        public async Task<IActionResult> Create(RequestReqDto req)
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
                await _service.CreateRequest(req, objectId);
                return Ok("Request created");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [Authorize(Policy = "traveler")]
        [HttpPut("{reqId}")]
        public async Task<IActionResult> Update(string reqId,RequestReqDto req)
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
                await _service.UpdateRequest(reqId, objectId, req);
                return Ok("Request Updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Authorize(Policy = "traveler")]
        [HttpPut("delete/{reqId}")]
        public async Task<IActionResult> Delete(string reqId)
        {
            try
            {
                await _service.DeleteRequest(reqId);
                return Ok("Request Deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Authorize(Policy = "traveler")]
        [HttpGet("getMyRequests")]
        public async Task<IActionResult> GetMyRequests()
        {
            try
            {
                var userIdentity = User.Identity as ClaimsIdentity;

                // Retrieve the user's ID and role from the claims
                var userId = userIdentity.FindFirst(ClaimTypes.Name)?.Value;
                var requests = await _service.GetAllRequestsByOwnerID(userId);
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Authorize(Policy = "travel_agent")]
        [HttpGet("getMyRequestsByAgentId")]
        public async Task<IActionResult> GetAllRequestsByTravelAgent()
        {
            try
            {
                var userIdentity = User.Identity as ClaimsIdentity;

                // Retrieve the user's ID and role from the claims
                var userId = userIdentity.FindFirst(ClaimTypes.Name)?.Value;
                var requests = await _service.GetAllRequestsByAgentId(userId);
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

    }
}
