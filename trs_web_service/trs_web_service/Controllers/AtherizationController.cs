using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver.Core.Misc;
using Newtonsoft.Json.Linq;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Net;
using System.Security.Claims;
using trs_web_service.Models.Domains;
using trs_web_service.Services;
using trs_web_service.Models.Dtos;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace trs_web_service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtherizationController : ControllerBase
    {
        private readonly UserService _userService;

        public AtherizationController(UserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        [HttpGet("info")]
        public async Task<IActionResult> GetMyInfo()
        {
            try
            {
                // Get the user's identity
                var userIdentity = User.Identity as ClaimsIdentity;

                // Retrieve the user's ID and role from the claims
                var userId = userIdentity.FindFirst(ClaimTypes.Name)?.Value;
                var userRole = userIdentity.FindFirst(ClaimTypes.Role)?.Value;

                if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(userRole))
                {
                    return BadRequest("Invalid user identity.");
                }

                // You can now use userId and userRole to retrieve the user's information
                var user = await _userService.GetUserByID(userId);

                if (user == null)
                {
                    return NotFound("User not found.");
                }

                // Ensure that the user can only retrieve their own information or apply additional authorization logic here.

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> UserUpdateProfile(UserUpdateDto user)
        {
            try
            {
                // Get the user's identity
                var userIdentity = User.Identity as ClaimsIdentity;

                // Retrieve the user's ID and role from the claims
                var userId = userIdentity.FindFirst(ClaimTypes.Name)?.Value;
                var userRole = userIdentity.FindFirst(ClaimTypes.Role)?.Value;

                if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(userRole))
                {
                    return BadRequest("Invalid user identity.");
                }
                await _userService.UserUpdateProfile(user, userId);

                // Ensure that the user can only retrieve their own information or apply additional authorization logic here.

                return Ok("update successfully completed");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("reset_password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto password)
        {
            try
            {
                // Get the user's identity
                var userIdentity = User.Identity as ClaimsIdentity;

                // Retrieve the user's ID and role from the claims
                var userId = userIdentity.FindFirst(ClaimTypes.Name)?.Value;
                var userRole = userIdentity.FindFirst(ClaimTypes.Role)?.Value;

                if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(userRole))
                {
                    return BadRequest("Invalid user identity.");
                }
                await _userService.ResetPassword(password.Password, userId);

                // Ensure that the user can only retrieve their own information or apply additional authorization logic here.

                return Ok("update successfully completed");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
