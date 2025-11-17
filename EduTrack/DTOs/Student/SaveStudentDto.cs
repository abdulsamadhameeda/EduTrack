using System.ComponentModel.DataAnnotations;

namespace EduTrack.DTOs.Student
{
    public class SaveStudentDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long GradeLevelId { get; set; }
        public long ClassId { get; set; }
        public long? TeacherId { get; set; }
        public long ParentId { get; set; }
        //public long AssignmentId { get; set; }

    }
}
