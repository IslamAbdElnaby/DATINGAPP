using System.Security.Claims;
using System.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DATINGAPP.API.Models;
using DATINGAPP.API.Data;
using DATINGAPP.API.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using DATINGAPP.API.Helpers;

namespace DATINGAPP.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDatingRepository _repo;

        public UserController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        // GET api/user
        [HttpGet("{action}")]
        public async Task<ActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            return Ok(_mapper.Map<IEnumerable<UserDto>>(users));
        }

        // GET api/user/5
        [HttpGet("{action}/{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            return Ok(_mapper.Map<UserDto>(user));
        }

        // POST api/user
        [HttpPost("")]
        public async Task Post([FromBody] UserDto user)
        {
            var pics = user.Photos;
            var photos = _mapper.Map<IEnumerable<Photo>>(pics);
            var u = _mapper.Map<User>(user);
        }

        // PUT api/user/5
        [HttpPut("{action}/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDto user)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var repoUser = await _repo.GetUser(id);
            _mapper.Map(user, repoUser);
            var res = await _repo.SaveAll();
            if (!res)
                throw Exception($"Failed to update user with ID: {id}");
            return NoContent();
        }

        private Exception Exception(string v)
        {
            throw new NotImplementedException();
        }

        // DELETE api/user/5
        [HttpDelete("{id}")]
        public void DeleteById(int id) { }
    }
}