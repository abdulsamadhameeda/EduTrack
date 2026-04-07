using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrack.Model
{
    public class Grade
    {
        [Key]
        public long Id { get; set; }

        [MaxLength(50)]
        public string? SubjectName { get; set; }
        public long? score { get; set; }

        [ForeignKey("Student")]
        public long StudentId { get; set; }
        public Student? Student { get; set; } //Navigation Propertey
        [ForeignKey("LookupSubject")]
        public long? SubjectId { get; set; }
        public Lookup? LookupSubject { get; set; }  //Navigation Propertey

        [ForeignKey("LookupMonth")]
        public long? GradeMonthId { get; set; }
        public Lookup? LookupMonth { get; set; }  //Navigation Propertey

    }
}
