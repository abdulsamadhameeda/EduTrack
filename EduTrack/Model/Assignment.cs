using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrack.Model
{
    public class Assignment
    {
        [Key]
        public long Id { get; set; }
       
        public string? Description { get; set; }
        public DateTime DueDateSub { get; set; }

        [ForeignKey("LookupSubject")]
        public long? SubjectId { get; set; }
        public Lookup? LookupSubject { get; set; }

        // 🔹 الصف (Grade)
        [ForeignKey("LookupGrade")]
        public long? GradeLevelId { get; set; }
        public Lookup? LookupGrade { get; set; }

        // 🔹 الشعبة (Class)
        [ForeignKey("LookupClass")]
        public long? ClassId { get; set; }
        public Lookup? LookupClass { get; set; }

    }
}
