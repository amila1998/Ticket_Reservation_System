using Amazon.Auth.AccessControlPolicy;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
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


        [Authorize (Policy= "backoffice")]
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var travelers = await _userService.GetAllUsersAsync();
                return Ok(travelers);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "nottraveler")]
        [HttpGet("{nic}")]
        public async Task<IActionResult> GetUserByNIC(string nic)
        {
            try
            {
                var traveler = await _userService.GetUserByNICAsync(nic);
                if (traveler == null)
                {
                    return NotFound();
                }
                return Ok(traveler);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
         
        }


        [HttpPost]
        public async Task<IActionResult> Register(UserRegisterDto user)
        {
            try
            {
                await _userService.CreateTravelerAsync(user);
                return Ok("register succsses");
            }
            catch (Exception ex)
            {
               return BadRequest(ex.Message);
            }
            
        }

        [Authorize]
        [HttpPut ("deactivate/{nic}")]
        public async Task<IActionResult> DeactivateUser(string nic)
        {
            try
            {
                await _userService.DeactivateUserAsync(nic);
                return Ok("account deactivated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
          
        }

        [Authorize(Policy= "backoffice")]
        [HttpPut("activate/{nic}")]
        public async Task<IActionResult> ActivateUser(string nic)
        {
            try
            {
                await _userService.ActivateUserAsync(nic);
                return Ok("account activated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }

}
