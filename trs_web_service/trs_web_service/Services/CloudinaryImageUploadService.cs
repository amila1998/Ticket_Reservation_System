/// Services/CloudinaryImageUploadService.cs


using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample.UserManagement.Application
{
    public class CloudinaryImageUploadService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryImageUploadService(Cloudinary cloudinary)
        {
            _cloudinary = cloudinary;
        }

        /// <summary>
        /// Uploads an image to Cloudinary and returns the image URL.
        /// </summary>
        /// <param name="imageFile">The image file to upload.</param>
        /// <returns>The URL of the uploaded image.</returns>
        public async Task<string> UploadImageAsync(IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
                throw new Exception("No file uploaded.");

            if (imageFile.Length > 2_000_000) // Adjust the maximum file size limit
                throw new Exception("File size exceeds the limit.");

            if (!IsImageFile(imageFile.FileName))
                throw new Exception("Invalid file type. Only image files are allowed.");

            // Upload the image to Cloudinary
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(imageFile.FileName, imageFile.OpenReadStream()),
                Folder = "trs-images" // Specify the folder where the images should be stored in Cloudinary
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            if (uploadResult.Error != null)
                throw new Exception("Failed to upload the image.");

            // Get the image URL from the upload result
            var imageUrl = uploadResult.SecureUrl.ToString();

            return imageUrl;
        }

        /// <summary>
        /// Validates if the given file name has an allowed image file extension.
        /// </summary>
        /// <param name="fileName">The name of the file to validate.</param>
        /// <returns>True if the file has an allowed image file extension; otherwise, false.</returns>
        private bool IsImageFile(string fileName)
        {
            // Method to validate the file extension or MIME type
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
            var fileExtension = System.IO.Path.GetExtension(fileName).ToLowerInvariant();
            return Array.IndexOf(allowedExtensions, fileExtension) >= 0;
        }
    }
}