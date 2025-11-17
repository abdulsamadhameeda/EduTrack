using EduTrack.DTOs.Parent;
using EduTrack.DTOs.Student;
using EduTrack.DTOs.Teacher;
using EduTrack.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EduTrack.Controllers
{
    [Authorize(Roles = "Admin,Teacher,Parent")]
    [Route("api/[controller]")]
    [ApiController]
    public class ParentsController : ControllerBase
    {
        private ETDbContext _dbContext;
        public ParentsController(ETDbContext dbContext) //Constructor
        {
            _dbContext = dbContext;
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll([FromQuery] FilterParentsDto filterDto)
        {
            try
            {
                var data = from parent in _dbContext.Parents
                           where (filterDto.Id == null || parent.Id == filterDto.Id) &&
                                 (filterDto.Name == null || parent.Name.ToUpper().Contains(filterDto.Name.ToUpper()))
                               &&  (parent.StudentId == 0 || parent.StudentId == null) // ✅ فقط اللي ما عندهم طالب

                           orderby parent.Id
                           select new ParentDto
                           {
                               Id = parent.Id,
                               Name = parent.Name,
                               Email = parent.Email,
                               Phone = parent.Phone,
                               StudentId = parent.StudentId

                           };


                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("GetAllParent")]
        public IActionResult GetAllParent([FromQuery] FilterParentsDto filterDto)
        {
            try
            {
                var data = from parent in _dbContext.Parents
                           where (filterDto.Id == null || parent.Id == filterDto.Id) &&
                                 (filterDto.Name == null || parent.Name.ToUpper().Contains(filterDto.Name.ToUpper())) 

                           orderby parent.Id
                           select new ParentDto
                           {
                               Id = parent.Id,
                               Name = parent.Name,
                               Email = parent.Email,
                               Phone = parent.Phone,
                               StudentId = parent.StudentId,
                               

                           };


                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("GetById")]
        public IActionResult GetById([FromQuery] long Id)
        {
            try
            {
                var parent = _dbContext.Parents.Select(parent => new ParentDto
                {
                    Id = parent.Id,
                    Name = parent.Name,
                    Email = parent.Email,
                    Phone = parent.Phone,
                    StudentId=parent.StudentId

                }).FirstOrDefault(x => x.Id == Id);


                return Ok(parent);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetByUserId")]
        public IActionResult GetByUserId(int userId)
        {
            try
            {
                var parent = _dbContext.Parents.FirstOrDefault(p => p.UserId == userId);

                if (parent == null)
                    return NoContent(); // 204

                return Ok(parent);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("Add")]

        public IActionResult Add([FromBody] SaveParentDto parentDto)
        {
            try
            {
                // 🔍 نجيب Lookup الخاص بالـ "Parent"
                var parentLookup = _dbContext.Lookups
                    .FirstOrDefault(x => x.Name.ToLower() == "Parent");

                if (parentLookup == null)
                    return BadRequest("Lookup for 'Parent' not found in Lookups table.");


                var user = new User()
                {
                    Id = 0,
                    UserName = $"{parentDto.Name}_ET", // Mariam --> Mariam_HR
                    HashedPassword = BCrypt.Net.BCrypt.HashPassword($"{parentDto.Name}@123"), // Mariam --> Mariam@123
                    IsAdmin = false,
                    UserTypeId = parentLookup.Id,
                };


                var _user = _dbContext.Users.FirstOrDefault(x => x.UserName.ToUpper() == user.UserName.ToUpper());
                if (_user != null)
                {
                    return BadRequest("Cannot Add this Parent : The Username Already Exist . Please Select Another Name");
                }
                _dbContext.Users.Add(user);


                var parent = new Parent()
                {
                    Id = 0,
                    Name = parentDto.Name,
                    Email = parentDto.Email,
                    Phone = parentDto.Phone,
                    StudentId=parentDto.StudentId,
                    User = user
                };
                _dbContext.Parents.Add(parent);
                _dbContext.SaveChanges();
                return Ok();


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("Update")]
        public IActionResult Update(SaveParentDto parentDto)
        {
            try
            {
                var parent = _dbContext.Parents.FirstOrDefault(x => x.Id == parentDto.Id);
                if (parent == null)
                {
                    return BadRequest("Parent Not Found!");
                }
                parent.Name = parentDto.Name;
                parent.Email = parentDto.Email;
                parent.Phone = parentDto.Phone;




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
                var parent = _dbContext.Parents.FirstOrDefault(x => x.Id == Id);
                if (parent == null)
                {
                    return BadRequest("Parent Does Not Exist");

                }
                _dbContext.Parents.Remove(parent);
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
