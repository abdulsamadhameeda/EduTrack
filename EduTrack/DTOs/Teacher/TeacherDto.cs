using System.ComponentModel.DataAnnotations;

namespace EduTrack.DTOs.Teacher
{
    public class TeacherDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public DateTime? StartDate { get; set; } 

    }
}
