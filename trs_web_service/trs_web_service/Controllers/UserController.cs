using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using trs_web_service.Models.Domains;
using trs_web_service.Models.Dtos;
using trs_web_service.Services;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace trs_web_service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUserss()
        {
            var travelers = await _userService.GetAllUsersAsync();
            return Ok(travelers);
        }

        [HttpGet("{nic}")]
        public async Task<IActionResult> GetTravelerByNIC(string nic)
        {
            var traveler = await _userService.GetTravelerByNICAsync(nic);
            if (traveler == null)
            {
                return NotFound();
            }
            return Ok(traveler);
        }


        [HttpPost]
        public async Task<IActionResult> CreateTraveler(UserRegisterDto user)
        {
            await _userService.CreateTravelerAsync(user);
            return CreatedAtAction(nameof(GetTravelerByNIC), new { nic = user.NIC }, user); ;
        }
    }
}
