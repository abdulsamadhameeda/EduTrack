using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrack.Model
{
    public class Parent
    {
        [Key]
        public long Id { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public long StudentId { get; set; } 

        [ForeignKey("User")]
        public long? UserId { get; set; }
        public User? User { get; set; } //Navigation Propertey


    }
}
