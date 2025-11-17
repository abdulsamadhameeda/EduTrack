using EduTrack.DTOs.Attendance;
using EduTrack.DTOs.Grrade;
using EduTrack.DTOs.Grade;
using EduTrack.DTOs.Parent;
using EduTrack.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace EduTrack.Controllers
{
    [Authorize(Roles = "Teacher,Parent")]
    [Route("api/[controller]")]
    [ApiController]
    public class GradesController : ControllerBase
    {
        private ETDbContext _dbContext;
        public GradesController(ETDbContext dbContext) //Constructor
        {
            _dbContext = dbContext;
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll([FromQuery] FilterGradesDto filterDto)
        {
            try
            {
                var data = from grade in _dbContext.Grades
                           from student in _dbContext.Students.Where(x => x.Id == grade.StudentId) //Join
                           from lookup in _dbContext.Lookups.Where(x => x.Id == grade.SubjectId)// Join
                           from lookup2 in _dbContext.Lookups.Where(x => x.Id == grade.GradeMonth).DefaultIfEmpty()// Left Join
                           where (filterDto.Id == null || grade.Id == filterDto.Id) &&
                                 (filterDto.SubjectName == null || grade.SubjectName.ToUpper().Contains(filterDto.SubjectName.ToUpper()))
                           orderby grade.Id
                           select new GradeDto
                           {
                               Id = grade.Id,
                               score = grade.score,
                               StudentId = grade.StudentId, // Or student.Id
                               SubjectId = grade.SubjectId,
                               StudentName = student.Name,
                               GradeMonth = grade.GradeMonth,


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
        //        var grade = _dbContext.Grades.Select(grade => new GradeDto
        //        {
        //            Id = grade.Id,
        //            SubjectName = grade.SubjectName,
        //            score = grade.score,
        //            StudentId = grade.StudentId,
        //            SubjectId = grade.SubjectId,
        //            GradeMonth = x.GradeMonth,


        //        }).FirstOrDefault(x => x.Id == Id);


        //        return Ok(grade);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        [HttpGet("GetByStudentId")]
        public IActionResult GetByStudentId([FromQuery] long studentId)
        {
            try
            {
                var grades = _dbContext.Grades
                    .Where(x => x.StudentId == studentId)
                    .Select(x => new GradeDto
                    {
                        Id = x.Id,
                        SubjectName = x.Lookup != null ? x.Lookup.Name : null,
                        StudentName = x.Student != null ? x.Student.Name : null,
                        score = x.score,
                        StudentId = x.StudentId,
                        SubjectId = x.SubjectId,
                        GradeMonth = x.GradeMonth,
                    })
                    .ToList();

                if (!grades.Any())
                    return NotFound($"No grades found for student with ID {studentId}");

                return Ok(grades);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Teacher")]
        [HttpPost("Add")]

        public IActionResult Add([FromBody] List<SaveGradeDto> gradesDto)
        {
            try
            {

                if (gradesDto == null)
                {
                    return BadRequest("grad list is required.");
                }
                foreach (var item in gradesDto)
                {
                    // ⚠️ إضافة check على StudentId للتأكد أن الطالب موجود
                    var studentExists = _dbContext.Students.Any(s => s.Id == item.StudentId);
                    if (!studentExists)
                        return BadRequest($"StudentId {item.StudentId} does not exist.");
                    else {
                        var grade = new Grade()
                        {
                            score = item.score,
                            SubjectId = item.SubjectId,
                            StudentId = item.StudentId,
                            GradeMonth = item.GradeMonth,

                        };
                        _dbContext.Grades.Add(grade);
                    }
                     
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
        public IActionResult Update(SaveGradeDto gradeDto)
        {
            try
            {
                var grade = _dbContext.Grades.FirstOrDefault(x => x.Id == gradeDto.Id);
                if (grade == null)
                {
                    return BadRequest("Grade Not Found!");
                }
                grade.Id = gradeDto.Id;
                grade.score = gradeDto.score;
                grade.SubjectName = gradeDto.SubjectName;
                grade.StudentId = gradeDto.StudentId;
                grade.SubjectId = gradeDto.SubjectId;
                grade.GradeMonth = gradeDto.GradeMonth;




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
                var grade = _dbContext.Grades.FirstOrDefault(x => x.Id == Id);
                if (grade == null)
                {
                    return BadRequest("Grade Does Not Exist");

                }
                _dbContext.Grades.Remove(grade);
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
