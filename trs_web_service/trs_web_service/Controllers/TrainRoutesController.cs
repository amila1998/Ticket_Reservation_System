using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using trs_web_service.Models.Dtos;
using trs_web_service.Services;

namespace trs_web_service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainRoutesController : ControllerBase
    {
        private readonly TrainRoutesService _service;

        public TrainRoutesController(TrainRoutesService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllRoutes()
        {
            try
            {
                var route = await _service.GetAllRoutes();
                return Ok(route);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize (Policy = "backoffice")]
        [HttpPost]
        public async Task<IActionResult> CreateRoute(TrainRouteReqDto req)
        {
            try
            {
                await _service.CreateRoute(req);
                return Ok("Train Route Created Successfully !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "backoffice")]
        [HttpPut ("deleteRoute/{id}")]
        public async Task<IActionResult> DeleteRoute(string id)
        {
            try
            {
                await _service.DeleteRoute(id);
                return Ok("Train Route Deleted Successfully !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "backoffice")]
        [HttpPut("disableRoute/{id}")]
        public async Task<IActionResult> DisableRoute(string id)
        {
            try
            {
                await _service.DisableRoute(id);
                return Ok("Train Route Disabled Successfully !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Authorize(Policy = "backoffice")]
        [HttpPut("enableRoute/{id}")]
        public async Task<IActionResult> EnableRoute(string id)
        {
            try
            {
                await _service.EnableRoute(id);
                return Ok("Train Route Enabled Successfully !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Authorize(Policy = "backoffice")]
        [HttpPut("updateRoute/{id}")]
        public async Task<IActionResult> UpdateRoute(string id, TrainRouteReqDto req)
        {
            try
            {
                await _service.UpdateRoute(id, req);
                return Ok("Train Route Update Successfully !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
