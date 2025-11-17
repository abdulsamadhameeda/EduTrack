using System.ComponentModel.DataAnnotations;

namespace EduTrack.DTOs.Assignment
{
    public class SaveAssignmentDto
    {
        public string? Description { get; set; }
        public DateTime DueDateSub { get; set; }

        public long? SubjectId { get; set; }
        public long? GradeLevelId { get; set; }
        public long? ClassId { get; set; }
    }
}
