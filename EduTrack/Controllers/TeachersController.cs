using EduTrack.DTOs;
using EduTrack.DTOs.Teacher;
using EduTrack.DTOs.TeacherDto;
using EduTrack.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EduTrack.Controllers
{
    [Authorize(Roles = "Admin,Teacher,Parent")]
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : ControllerBase
    {
        private ETDbContext _dbContext;

        public TeachersController(ETDbContext dbContext) //Constructor
        {
            _dbContext = dbContext;
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll([FromQuery] FilterTeachersDto filterDto)
        {
            try
            {
                var data = from teacher in _dbContext.Teachers
                           where (filterDto.Id == null || teacher.Id == filterDto.Id) &&
                                 (filterDto.Name == null || teacher.Name.ToUpper().Contains(filterDto.Name.ToUpper()))
                           orderby teacher.Id 
                           select new TeacherDto
                           {
                               Id = teacher.Id,
                               Name = teacher.Name,
                               Email = teacher.Email,
                               StartDate = teacher.StartDate,
                               Phone = teacher.Phone,

                           };


                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        //[HttpGet("GetById")]
        //public IActionResult GetById([FromQuery] long Id)
        //{   
        //    try
        //    {
        //        var teacher = _dbContext.Teachers.Select(teacher => new TeacherDto
        //        {
        //            Id = teacher.Id,
        //            Name = teacher.Name,
        //            Email = teacher.Email,
        //            StartDate = teacher.StartDate,
        //            Phone = teacher.Phone,
        //        }).FirstOrDefault(x => x.Id == Id);


        //        return Ok(teacher);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        [HttpGet("GetByUserId")]
        public IActionResult GetByUserId(int userId)
        {
            try
            {
                var teacher = _dbContext.Teachers
                    .FirstOrDefault(t => t.UserId == userId);

                if (teacher == null)
                    return NoContent(); // 204

                return Ok(teacher);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("Add")]
 
        public IActionResult Add([FromBody] SaveTeacherDto teacherDto)
        {
            try
            {
                // 🔍 نجيب Lookup الخاص بالـ "Teacher"
                var teacherLookup = _dbContext.Lookups
                    .FirstOrDefault(x => x.Name.ToLower() == "teacher");

                if (teacherLookup == null)
                    return BadRequest("Lookup for 'Teacher' not found in Lookups table.");


                var user = new User()
                {
                    Id = 0,
                    UserName = $"{teacherDto.Name}_ET", // Mariam --> Mariam_HR
                    HashedPassword = BCrypt.Net.BCrypt.HashPassword($"{teacherDto.Name}@123"), // Mariam --> Mariam@123
                    IsAdmin = false,
                    UserTypeId = teacherLookup.Id,
                };


                var _user = _dbContext.Users.FirstOrDefault(x => x.UserName.ToUpper() == user.UserName.ToUpper());
                if (_user != null)
                {
                    return BadRequest("Cannot Add this Teacher : The Username Already Exist . Please Select Another Name");
                }
                _dbContext.Users.Add(user);


                var teacher = new Teacher()
                {
                    Id = 0,
                    Name = teacherDto.Name,
                    Phone = teacherDto.Phone,
                    Email = teacherDto.Email,
                    StartDate = teacherDto.StartDate,
                    EndDate = teacherDto.EndDate,
                    User = user,

                };
                _dbContext.Teachers.Add(teacher);
                _dbContext.SaveChanges(); 
                return Ok(); 


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
                //return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }
        }


        [HttpPut("Update")]
        public IActionResult Update(SaveTeacherDto teacherDto)
        {
            try
            {
                var teacher = _dbContext.Teachers.FirstOrDefault(x => x.Id == teacherDto.Id); 
                if (teacher == null)
                    return BadRequest("Teacher Not Found!"); 
                
                teacher.Name = teacherDto.Name;
                teacher.Phone = teacherDto.Phone;
                teacher.Email = teacherDto.Email;
                //teacher.StartDate = teacherDto.StartDate;
                //teacher.EndDate = teacherDto.EndDate;

                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete("Delete")]
        public IActionResult Delete(long Id)
        {
            try
            {
                var teacher = _dbContext.Teachers.FirstOrDefault(x => x.Id == Id);
                if (teacher == null)
                {
                    return BadRequest("Teacher Does Not Exist"); 

                }             
                _dbContext.Teachers.Remove(teacher);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
