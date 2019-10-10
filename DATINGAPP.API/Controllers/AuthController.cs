using System.Text;
using System.Security.Claims;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DATINGAPP.API.Data;
using DATINGAPP.API.DTOs;
using DATINGAPP.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
//using DATINGAPP.API.Models;

namespace DATINGAPP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _config = config;
            _repo = repo;
            _mapper = mapper;
        }
        [HttpPost("{action}")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO user)
        {
            var exist = await _repo.UserExists(user.Username.ToLower());
            if (exist)
                return BadRequest("This username Is Tokken");
            var rUser = _mapper.Map<User>(user);
            var regUser = await _repo.Register(rUser, user.Password);
            var userRet = _mapper.Map<UserDto>(regUser);
            return CreatedAtRoute("GetUser", new { controller = "User", id = regUser.Id }, userRet);
        }

        [HttpPost("{action}")]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO user)
        {
            var lUser = await _repo.Login(user.Username, user.password);

            if (lUser == null)
                return Unauthorized();
            var claims = new[]
            {
               new Claim(ClaimTypes.NameIdentifier, lUser.Id.ToString()),
               new Claim(ClaimTypes.Name, lUser.Name),
           };
            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            var tokenDescripor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwt = tokenHandler.CreateToken(tokenDescripor);
            return Ok(new
            {
                token = tokenHandler.WriteToken(jwt),
                picUrl = _mapper.Map<UserDto>(lUser).PicUrl
            });
        }
    }
}