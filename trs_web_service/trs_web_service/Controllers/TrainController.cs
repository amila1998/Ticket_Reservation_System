using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using trs_web_service.Models.Dtos;
using trs_web_service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace trs_web_service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainController : ControllerBase
    {
        private readonly TrainService _trainService;

        public TrainController(TrainService service)
        {
            _trainService = service;
        }

        [Authorize (Policy = "backoffice")]
        [HttpPost]
        public async Task<IActionResult> Create(TrainReqBodyDto train)
        {
            try
            {
                await _trainService.CreateTrainAsync(train);
                return Ok("train created");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Authorize(Policy = "nottraveler")]
        [HttpGet]
        public async Task<IActionResult> GetAllTrains()
        {
            try
            {
                var trains = await _trainService.GetAllTrainsAsync();
                return Ok(trains);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "backoffice")]
        [HttpPut ("changeActiveStatus/{regNo}")]
        public async Task<IActionResult> ChangeActiveStatus(string regNo)
        {
            try
            {
                await _trainService.ChangeActiveStatus(regNo);
                return Ok("Status Changes");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "backoffice")]
        [HttpPut]
        public async Task<IActionResult> UpdateTrain(TrainReqBodyDto train)
        {
            try
            {
                await _trainService.UpdateTrain(train);
                return Ok("Train updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



    }
}
