using EduTrack.DTOs.Attendance;
using EduTrack.DTOs.Grade;

namespace EduTrack.DTOs.Grrade
{
    public class SaveGradeDto
    {
        public long Id { get; set; }
        public long StudentId { get; set; }
        public string? SubjectName { get; set; }
        public long score { get; set; }
        public long SubjectId { get; set; }
        public long? GradeMonth { get; set; }

    }
}
