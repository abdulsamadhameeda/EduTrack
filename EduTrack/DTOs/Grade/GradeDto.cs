using System.ComponentModel.DataAnnotations;

namespace EduTrack.DTOs.Grade
{
    public class GradeDto
    {
        public long Id { get; set; }
        public long StudentId { get; set; }
        public string? SubjectName { get; set; }
        public string? StudentName { get; set; }
        public long? score { get; set; }
        public long? SubjectId { get; set; }
        public long? GradeMonth { get; set; }

    }
}
