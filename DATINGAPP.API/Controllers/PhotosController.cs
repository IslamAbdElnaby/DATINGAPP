using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DATINGAPP.API.Data;
using DATINGAPP.API.DTOs;
using DATINGAPP.API.Helpers;
using DATINGAPP.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
//using DATINGAPP.API.Models;

namespace DATINGAPP.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDatingRepository _repo;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public PhotosController(IDatingRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _mapper = mapper;
            _repo = repo;
            _cloudinaryConfig = cloudinaryConfig;
            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(acc);
        }

        // GET api/photos
        [HttpGet("")]
        public ActionResult<IEnumerable<string>> Gets()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/photos/5
        [HttpGet("{id}")]
        public ActionResult<string> GetById(int id)
        {
            return "value" + id;
        }

        // POST api/photos
        [HttpPost("{userId}")]
        public async Task<IActionResult> AddUserPhoto(int userId, [FromForm] PhotoDto photo)
        {
            photo.UserId = userId;
            if (photo.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var file = photo.File;
            var uploadRes = new ImageUploadResult();
            if (file.Length > 0)
            {
                var repoUser = await _repo.GetUser(userId);
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                        .Width(500)
                        .Height(500)
                        .Crop("fill")
                        .Gravity("face")
                    };
                    uploadRes = _cloudinary.Upload(uploadParams);
                    photo.Url = uploadRes.Uri.ToString();
                    photo.PublicId = uploadRes.PublicId;

                    var pic = _mapper.Map<Photo>(photo);
                    if (!repoUser.Photos.Any(p => p.IsMain)) pic.IsMain = true;
                    repoUser.Photos.Add(pic);
                    var res = await _repo.SaveAll();
                    photo.Id = pic.Id;
                    if (res) return Ok(photo);
                }
            }
            return BadRequest("Failed");

        }

        // PUT api/photos/5
        [HttpPut("{userId}/{id}")]
        public async Task<IActionResult> Put(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var user = await _repo.GetUser(userId);
            if (!user.Photos.Any(p => p.Id == id)) return Unauthorized();

            var mainPhoto = await _repo.GetMainPhoto(userId);
            if (mainPhoto.Id == id) return NoContent();
            if (mainPhoto != null)
                mainPhoto.IsMain = false;
            var photo = await _repo.GetPhoto(id);
            photo.IsMain = true;
            var res = await _repo.SaveAll();
            if (res)
                return NoContent();
            return BadRequest("Failed");
        }

        // DELETE api/photos/5
        [HttpDelete("{userId}/{id}")]
        public async Task<IActionResult> DeleteById(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var photo = await _repo.GetPhoto(id);
            if (photo.IsMain) return BadRequest("you cannot delete tha main photo");
            if (photo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photo.PublicId);
                var result = _cloudinary.Destroy(deleteParams);
                if (result.Result.ToLower() == "ok")
                    _repo.Delete(photo);
            }
            else _repo.Delete(photo);
            var res = await _repo.SaveAll();
            if (!res) return BadRequest("Failed");
            return Ok(true);
        }
    }
}