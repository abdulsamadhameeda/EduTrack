using EduTrack.DTOs.Auth;
using EduTrack.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EduTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private ETDbContext _dbContext;

        public AuthController(ETDbContext dbContext) //Constructor
        {
            _dbContext = dbContext;
        }


        [HttpPost("Login")]
        public IActionResult Login(LoginDto loginDto)
        {
            try
            {
                var user = _dbContext.Users.FirstOrDefault(x => x.UserName.ToUpper() == loginDto.UserName.ToUpper());

                if (user == null)
                {
                    return BadRequest("Invalid UserName Or Password");
                }

                if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.HashedPassword))
                {
                    return BadRequest("Invalid UserName Or Password");
                }

                var token = GenerateJwToken(user);

                return Ok(new { token = token });
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private string GenerateJwToken(User user)
        {
            var claims = new List<Claim>();  //User Info

            //Key --> Value
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
            claims.Add(new Claim(ClaimTypes.Name, user.UserName));


            if (user.IsAdmin)
            {
                claims.Add(new Claim(ClaimTypes.Role, "Admin"));
            }
            else
            {
               var userType = _dbContext.Users.Include(x => x.Lookup).FirstOrDefault(x => x.Id == user.Id);
                claims.Add(new Claim(ClaimTypes.Role, userType.Lookup?.Name));
            }


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("WHAFWEI#!@S!!112312WQEQW@RWQEQW432"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenSettings = new JwtSecurityToken(
                    claims: claims, // User Info
                    expires: DateTime.Now.AddDays(1), // when Dose The Token Expire
                    signingCredentials: creds // Encryption Settings
                );

            var tokenHandller = new JwtSecurityTokenHandler(); //The Lastest Class
            var token = tokenHandller.WriteToken(tokenSettings);

            return token;
        }


    }
}
