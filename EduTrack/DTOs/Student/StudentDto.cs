using System.ComponentModel.DataAnnotations;

namespace EduTrack.DTOs.Student
{
    public class StudentDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string? GradeLevel { get; set; }
        public string? Class { get; set; }
        public long? TeacherId { get; set; }
        public string? TeacherName { get; set; }

        public long ParentId { get; set; }
        public string ParentName { get; set; }

        //public long AssignmentId { get; set; }
        public long? GradeLevelId { get; set; }
        public long? ClassId { get; set; }
    }
}
