namespace EduTrack.DTOs.Attendance
{
    public class AttendanceDto
    {
        public long Id { get; set; }
        public DateTime DayAbsent { get; set; }
        public long StudentId { get; set; }
    }
}
