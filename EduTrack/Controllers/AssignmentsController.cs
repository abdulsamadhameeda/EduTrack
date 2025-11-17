using EduTrack.DTOs.Assignment;
using EduTrack.DTOs.Student;
using EduTrack.Migrations;
using EduTrack.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EduTrack.Controllers
{
    [Authorize(Roles = "Teacher,Parent")]
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentsController : ControllerBase
    {
        private ETDbContext _dbContext;
        public AssignmentsController(ETDbContext dbContext) //Constructor
        {
            _dbContext = dbContext;
        }

        //[HttpGet("GetAll")]
        //public IActionResult GetAll([FromQuery] FilterAssignmentsDto filterDto)
        //{
        //    try
        //    {
        //        var data = from assignment in _dbContext.Assignments
        //                   from studentSassignments in _dbContext.StudentSAssignments.Where(x => x.AssignmentId == assignment.Id) //Join
        //                   where (filterDto.Id == null || assignment.Id == filterDto.Id) 
        //                   orderby assignment.Id
        //                   select new AssignmentDto
        //                   {
        //                       Id = assignment.Id,
        //                       Description = assignment.Description,
        //                       DueDateSub = assignment.DueDateSub,
        //                   };


        //        return Ok(data);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }

        //}

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var assignments = _dbContext.Assignments
                .Select(a => new 
                {
                    a.Id,
                    Description = a.Description,
                    DueDateSub = a.DueDateSub,
                    SubjectName = a.LookupSubject != null ? a.LookupSubject.Name : null,
                    GradeLevel = a.LookupGrade != null ? a.LookupGrade.Name : null,
                    Class = a.LookupClass != null ? a.LookupClass.Name : null
                })
                .ToList();

            return Ok(assignments);
        }

        [HttpGet("GetById")]
        public IActionResult GetById([FromQuery] long Id)
        {
            try
            {
                var assignment = _dbContext.Assignments.Select(assignment => new AssignmentDto
                {
                    Id = assignment.Id,
                    Description = assignment.Description,   
                    DueDateSub = assignment.DueDateSub,
                   

                }).FirstOrDefault(x => x.Id == Id);


                return Ok(assignment);
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
                // جلب بيانات الطالب
                var student = _dbContext.Students.FirstOrDefault(s => s.Id == studentId);
                if (student == null)
                    return NotFound($"Student with ID {studentId} not found");

                // جلب الواجبات حسب الصف والشعبة
                var assignments = _dbContext.Assignments
                    .Where(a => a.GradeLevelId == student.GradeLevelId
                             && a.ClassId == student.ClassId)
                    .Select(a => new AssignmentDto
                    {
                        Id = a.Id,
                        Description = a.Description,
                        DueDateSub = a.DueDateSub,
                        SubjectId = a.SubjectId,
                        SubjectName = a.LookupSubject != null ? a.LookupSubject.Name : null, // الاسم من Lookup
                        GradeLevelId = a.GradeLevelId,
                        ClassId = a.ClassId
                    })
                    .ToList();

                return Ok(assignments);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Teacher")]
        [HttpPost("Add")]
        public IActionResult Add([FromBody] SaveAssignmentDto assignmentDto)
        {
            try
            {
                var assignment = new Assignment()
                {
                    Id = 0,
                    Description = assignmentDto.Description,
                    DueDateSub = assignmentDto.DueDateSub,
                    SubjectId = assignmentDto.SubjectId,       
                    GradeLevelId = assignmentDto.GradeLevelId, 
                    ClassId = assignmentDto.ClassId            
                };

                _dbContext.Assignments.Add(assignment);
                _dbContext.SaveChanges();

                return Ok(new { message = "Assignment added successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }

        }

        //[HttpPut("Update")]
        //public IActionResult Update(SaveAssignmentDto assignmentDto)
        //{
        //    try
        //    {
        //        var assignment = _dbContext.Assignments.FirstOrDefault(x => x.Id == assignmentDto.Id);
        //        if (assignment == null)
        //        {
        //            return BadRequest("Assignment Not Found!");
        //        }
        //        assignment.Subject = assignmentDto.Subject;
        //        assignment.Description = assignmentDto.Description;
        //        assignment.DueDateSub = assignmentDto.DueDateSub;



        //        _dbContext.SaveChanges();
        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }

        //}

        [HttpDelete("Delete")]
        public IActionResult Delete(long Id)
        {
            try
            {
                var assignment = _dbContext.Assignments.FirstOrDefault(x => x.Id == Id);
                if (assignment == null)
                {
                    return BadRequest("Assignment Does Not Exist");

                }
                _dbContext.Assignments.Remove(assignment);
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
