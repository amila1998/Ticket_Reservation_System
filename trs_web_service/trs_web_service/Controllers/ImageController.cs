using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sample.UserManagement.Application;

namespace Sample.UserManagement.Presentation.Controllers
{
    [ApiController]
    [Route("api/images")]
    public class ImageController : ControllerBase
    {
        private readonly CloudinaryImageUploadService _imageUploadService;

        public ImageController(CloudinaryImageUploadService imageUploadService)
        {
            _imageUploadService = imageUploadService;
        }

        [HttpPost]
        public async Task<IActionResult> UploadImage(IFormFile files)
        {
            try
            {
                var imageUrl = await _imageUploadService.UploadImageAsync(files);
                if (imageUrl == null)
                {
                    return BadRequest("Somthing wrong");
                }
                return Ok(imageUrl);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }
    }
}
