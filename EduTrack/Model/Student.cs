using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace EduTrack.Model
{
    public class Student
    {
        
        [Key]
        public long Id { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        public string? GradeLevel { get; set; }
        public string? Class { get; set; }
        [ForeignKey ("Teacher")]
        public long? TeacherId { get; set; }
        public Teacher? Teacher { get; set; }
        [ForeignKey("Parent")]
        public long ParentId { get; set; }
        public Parent Parent { get; set; }

        //public long AssignmentId { get; set; }
        [ForeignKey("Lookup")]
        public long? GradeLevelId { get; set; }
        public Lookup? Lookup { get; set; }  //Navigation Propertey


        [ForeignKey("Lookup2")]
        public long? ClassId { get; set; }
        public Lookup? Lookup2 { get; set; }  //Navigation Propertey




    }
}
