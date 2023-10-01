using Microsoft.AspNetCore.Mvc;
using trs_web_service.Models.Dtos;
using trs_web_service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace trs_web_service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly AuthenticationService _service;

        public AuthenticationController(AuthenticationService service)
        {
            _service = service;
        }

        [HttpPost("login")]
        public ActionResult LoginUser([FromBody] LoginDto loginDto)
        {
            try
            {
                var token = _service.Authenticate(loginDto.NIC, loginDto.Password);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("forgot_password")]
        public ActionResult ForgotPasswordUser([FromBody] ForgotDto forgotDto)
        {
            try
            {
                var token = _service.ForgotPassword(forgotDto.NIC, forgotDto.Email);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
