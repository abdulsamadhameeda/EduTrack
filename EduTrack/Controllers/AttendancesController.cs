using EduTrack.DTOs.Attendance;
using EduTrack.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace EduTrack.Controllers
{
    [Authorize(Roles = "Teacher,Parent")]
    [Route("api/[controller]")]
    [ApiController]
    public class AttendancesController : ControllerBase
    {
        private ETDbContext _dbContext;

        public AttendancesController(ETDbContext dbContext) //Constructor
        {
            _dbContext = dbContext;
        }


        [HttpGet("GetAll")]
        public IActionResult GetAll([FromQuery] FilterAttendancesDto filterDto ) 
        {
            try
            {
                var data = from attendance in _dbContext.Attendances
                           from student in _dbContext.Students.Where(x => x.Id == attendance.StudentId) //Join
                           where (filterDto.Id == null || attendance.Id == filterDto.Id)
                           orderby attendance.Id
                           select new AttendanceDto
                           {
                               Id = attendance.Id,
                               DayAbsent = attendance.DayAbsent,
                               StudentId = attendance.StudentId
                           };


                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpGet("GetByStudentId")]
        public IActionResult GetByStudentId([FromQuery] long studentId)
        {
            try
            {
                var attendances = _dbContext.Attendances
                    .Where(x => x.StudentId == studentId)
                    .Select(x => new AttendanceDto
                    {
                        Id = x.Id,
                        DayAbsent = x.DayAbsent,
                        StudentId = x.StudentId,
                        
                    })
                    .ToList();

                if (!attendances.Any())
                    return Ok(new List<AttendanceDto>());

                return Ok(attendances);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Teacher")]
        [HttpPost("Add")]

        public IActionResult Add([FromBody] List<SaveAttendanceDto> attendancesDto)
        {
            try
            {
                if (attendancesDto == null || !attendancesDto.Any())
                {
                    return BadRequest("attendanceDto list is required.");
                }

                foreach (var attendanceDto in attendancesDto)
                {
                  
                    var studentExists = _dbContext.Students.Any(s => s.Id == attendanceDto.StudentId);
                    if (!studentExists)
                        return BadRequest($"StudentId {attendanceDto.StudentId} does not exist.");

                    bool alreadyAbsent = _dbContext.Attendances.Any(a =>
                      a.StudentId == attendanceDto.StudentId &&
                      a.DayAbsent.Date == attendanceDto.DayAbsent.Date);

                    if (alreadyAbsent)
                        return BadRequest($"StudentId {attendanceDto.StudentId} is already marked absent for {attendanceDto.DayAbsent:yyyy-MM-dd}");

                    var attendance = new Attendance()
                    {
                        Id = 0, 
                        DayAbsent = attendanceDto.DayAbsent,
                        StudentId = attendanceDto.StudentId,
                    };
                    _dbContext.Attendances.Add(attendance);
                }

                _dbContext.SaveChanges();
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("Update")]
        public IActionResult Update(SaveAttendanceDto attendanceDto)
        {
            try
            {
                var attendance = _dbContext.Attendances.FirstOrDefault(x => x.Id == attendanceDto.Id);
                if (attendance == null)
                    return BadRequest("Attendance Not Found!");

                attendance.Id = attendanceDto.Id;
                attendance.DayAbsent = attendanceDto.DayAbsent;
                attendance.StudentId = attendanceDto.StudentId;

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
                var attendance = _dbContext.Attendances.FirstOrDefault(x => x.Id == Id);
                if (attendance == null)
                {
                    return BadRequest("Attendance Does Not Exist");

                }
                _dbContext.Attendances.Remove(attendance);
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
