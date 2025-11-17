using System.ComponentModel.DataAnnotations;
namespace EduTrack.DTOs.Parent
{
    public class ParentDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public long StudentId { get; set; }


    }
}
