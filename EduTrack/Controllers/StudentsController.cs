using EduTrack.DTOs.Student;
using EduTrack.DTOs.Teacher;
using EduTrack.DTOs.TeacherDto;
using EduTrack.Migrations;
using EduTrack.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Security.Claims;

namespace EduTrack.Controllers
{
    [Authorize(Roles = "Teacher,Parent,Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private ETDbContext _dbContext;
        public StudentsController(ETDbContext dbContext) //Constructor
        {
            _dbContext = dbContext;
        }



        [HttpGet("GetAll")]
        public IActionResult GetAll([FromQuery] FilterStudentsDto filterDto)
        {
            try
            {
                var data = from student in _dbContext.Students
                           from teacher in _dbContext.Teachers.Where(x => x.Id == student.TeacherId).DefaultIfEmpty() // Left Join
                           from parent in _dbContext.Parents.Where(x => x.Id == student.ParentId) //Join
                           //from studentSassignments in _dbContext.StudentSAssignments.Where(x => x.StudentId == student.Id ) //Join
                           from lookup in _dbContext.Lookups.Where(x => x.Id == student.GradeLevelId).DefaultIfEmpty() // Left Join
                           from lookup1 in _dbContext.Lookups.Where(x => x.Id == student.ClassId).DefaultIfEmpty() // Left Join
                           where (filterDto.Id == null || student.Id == filterDto.Id) &&
                                 (filterDto.Name == null || student.Name.ToUpper().Contains(filterDto.Name.ToUpper())) &&
                                 (filterDto.GradeLevelId == null || student.GradeLevelId == filterDto.GradeLevelId) &&
                                 (filterDto.ClassId == null || student.ClassId == filterDto.ClassId)
                           orderby student.Id
                           select new StudentDto
                           {
                               Id = student.Id,
                               Name = student.Name,
                               GradeLevel = lookup.Name,    
                               Class = lookup1.Name,
                               TeacherId = student.TeacherId,
                               TeacherName= teacher.Name,
                               ParentId = student.ParentId,
                               //AssignmentId = studentSassignments.AssignmentId
                               GradeLevelId = student.GradeLevelId,
                               ClassId = student.ClassId,
                               ParentName=parent.Name
                               


                           };


                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Authorize(Roles = "Parent")]
        [HttpGet("GetById")]
        public IActionResult GetById([FromQuery] long Id)
        {
            try
            {
                var student = _dbContext.Students.Select(student => new StudentDto
                {
                    Id = student.Id,
                    Name = student.Name,
                    GradeLevel = student.Lookup.Name,
                    Class = student.Lookup2.Name,
                    TeacherId = student.TeacherId,
                    ParentId = student.ParentId,
                    GradeLevelId = student.GradeLevelId,
                    ClassId = student.ClassId,

                }).FirstOrDefault(x => x.Id == Id);


                return Ok(student);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpPost("Add")]
        public IActionResult Add([FromBody] SaveStudentDto studentDto)
        {
            try
            {

                var student = new Student()
                {
                    Id = 0,
                    Name = studentDto.Name,
                    TeacherId = studentDto.TeacherId,
                    ParentId = studentDto.ParentId,
                    GradeLevelId= studentDto.GradeLevelId,
                    ClassId = studentDto.ClassId,


                };
                _dbContext.Students.Add(student);
                _dbContext.SaveChanges();
                var parent = _dbContext.Parents.FirstOrDefault(p => p.Id == student.ParentId);
                if (parent != null)
                {
                    parent.StudentId = student.Id;
                    _dbContext.SaveChanges();
                }

                return Ok();


            }
            catch (Exception ex)    
            {
                //return BadRequest(ex.Message);
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }
        }


        [HttpPut("Update")]
        public IActionResult Update(SaveStudentDto studentDto)
        {
            try
            {
                var student = _dbContext.Students.FirstOrDefault(x => x.Id == studentDto.Id);
                if (student == null)
                {
                    return BadRequest("Student Not Found!");
                }
                student.Name = studentDto.Name;
                student.TeacherId = studentDto.TeacherId;
                student.ParentId = studentDto.ParentId;
                student.GradeLevelId = studentDto.GradeLevelId;
                student.ClassId = studentDto.ClassId;

                _dbContext.SaveChanges();
                var parent = _dbContext.Parents.FirstOrDefault(p => p.Id == student.ParentId);
                if (parent != null)
                {
                    parent.StudentId = student.Id;
                    _dbContext.SaveChanges();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }


        }


        [HttpDelete("Delete")]
        public IActionResult Delete(long Id)
        {
            try
            {
                var student = _dbContext.Students.FirstOrDefault(x => x.Id == Id);
                if (student == null)
                {
                    return BadRequest("Student Does Not Exist");

                }
                _dbContext.Students.Remove(student);
                _dbContext.SaveChanges();
                var parent = _dbContext.Parents.FirstOrDefault(p => p.Id == student.ParentId);
                if (parent != null)
                {
                    parent.StudentId = 0;
                    _dbContext.SaveChanges();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }






    }
}
