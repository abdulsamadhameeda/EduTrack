using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrack.Model
{
    public class User
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string HashedPassword { get; set; }
        public bool IsAdmin { get; set; }
        [ForeignKey("Lookup")]
        public long UserTypeId { get; set; }
        public Lookup? Lookup { get; set; }  //Navigation Propertey
    }
}
