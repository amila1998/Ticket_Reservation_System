using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using trs_web_service.Models.Dtos;
using trs_web_service.Services;

namespace trs_web_service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainScheduleController : ControllerBase
    {
        private readonly TrainScheduleService _service;

        public TrainScheduleController(TrainScheduleService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllShedules()
        {
            try
            {
                var schedules = await _service.GetAllShedulesAsync();
                return Ok(schedules);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize(Policy = "nottraveler")]
        [HttpGet ("{trainRegNo}")]
        public async Task<IActionResult> GetAllShedulesForManaage(string trainRegNo)
        {
            try
            {
                var schedules = await _service.GetAllShedulesForManageAsync(trainRegNo);
                return Ok(schedules);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize(Policy = "backoffice")]
        [HttpPost]
        public async Task<IActionResult> CreateShedule(TrainScheduleReqDto req)
        {
            try
            {
                await _service.CreateTrainScheduleAsync(req);
                return Ok("Train Schedule Created Successfully !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
