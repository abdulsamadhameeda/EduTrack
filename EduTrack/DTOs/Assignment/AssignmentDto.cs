namespace EduTrack.DTOs.Assignment
{
    public class AssignmentDto
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public DateTime DueDateSub { get; set; }
        public long? SubjectId { get; set; }
        public string? SubjectName { get; set; }   // 👈 جديد
        public string? GradeLevelName { get; set; }
        public string? ClassName { get; set; }

        public long? GradeLevelId { get; set; }
        public long? ClassId { get; set; }

    }
}
