using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrack.Model
{
    public class Attendance
    {
        [Key]
        public long Id { get; set; }
        public DateTime DayAbsent { get; set; }
        [ForeignKey("Student")]
        public long StudentId { get; set; }
        public Student Student { get; set; } //Navigation Propertey
    }
}
