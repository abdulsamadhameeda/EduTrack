using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrack.Model
{
    public class StudentSAssignments
    {
        public long Id { get; set; }
        [ForeignKey("Student")]
        public long StudentId { get; set; }
        public Student Student { get; set; } //Navigation Propertey
        [ForeignKey("Assignment")]
        public long AssignmentId { get; set; }
        public Assignment Assignment { get; set; } //Navigation Propertey

    }
}
