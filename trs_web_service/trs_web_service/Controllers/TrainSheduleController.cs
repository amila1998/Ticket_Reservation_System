/// Controllers/TrainScheduleController.cs

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
                return BadRequest(ex.Message);
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
                return BadRequest(ex.Message);
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
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "backoffice")]
        [HttpPut]
        public async Task<IActionResult> UpdateSchedule(TrainScheduleReqDto req)
        {
            try
            {
                await _service.UpdateSchedule(req);
                return Ok("Train Schedule Updated Successfully !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "backoffice")]
        [HttpPut ("deleteSchedule")]
        public async Task<IActionResult> DeleteSchedule(TrainScheduleReqDto req)
        {
            try
            {
                await _service.DeleteSchedule(req);
                return Ok("Train Schedule Updated Successfully !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "backoffice")]
        [HttpPut("changeCancelStatusInSchedule")]
        public async Task<IActionResult> ChangeCancelStatusInSchedule(TrainScheduleReqDto req)
        {
            try
            {
                await _service.ChangeCancelStatusInSchedule(req);
                return Ok("Train Schedule cancel status updated Successfully !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
