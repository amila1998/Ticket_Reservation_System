using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using trs_web_service.Models.Dtos;
using trs_web_service.Services;

namespace trs_web_service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainSheduleController : ControllerBase
    {
        [HttpPost]
        public Task<IActionResult> CreateShedule(TrainSheduleReqDto shedule)
        {
            try
            {
                return Task.FromResult<IActionResult>(Ok("register succsses"));
            }
            catch (Exception ex)
            {
                return Task.FromResult<IActionResult>(BadRequest(ex.Message));
            }

        }
    }
}
