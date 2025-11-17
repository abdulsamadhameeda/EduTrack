using EduTrack.Model;
using Microsoft.EntityFrameworkCore;

namespace EduTrack
{
    public class ETDbContext : DbContext
    {

        public ETDbContext(DbContextOptions<ETDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //Seed
            modelBuilder.Entity<Lookup>().HasData(
                // Users (Major Code =0 )
                new Lookup { Id = 1, MajorCode = 0, MinorCode = 0, Name = "Users" },
                new Lookup { Id = 2, MajorCode = 0, MinorCode = 1, Name = "Teacher" },
                new Lookup { Id = 3, MajorCode = 0, MinorCode = 2, Name = "Parent" },

                // Subjects (Major Code =1 )
                new Lookup { Id = 4, MajorCode = 1, MinorCode = 0, Name = "Subjects" },
                new Lookup { Id = 5, MajorCode = 1, MinorCode = 1, Name = "Mathematics" },
                new Lookup { Id = 6, MajorCode = 1, MinorCode = 2, Name = "English" },
                new Lookup { Id = 7, MajorCode = 1, MinorCode = 3, Name = "Arabic" },
                new Lookup { Id = 8, MajorCode = 1, MinorCode = 4, Name = "Science" },
                new Lookup { Id = 9, MajorCode = 1, MinorCode = 5, Name = "Biology" },
                new Lookup { Id = 10, MajorCode = 1, MinorCode = 6, Name = "Chemistry" },
                new Lookup { Id = 11, MajorCode = 1, MinorCode = 7, Name = "Physics" },
                new Lookup { Id = 12, MajorCode = 1, MinorCode = 8, Name = "History" },
                new Lookup { Id = 13, MajorCode = 1, MinorCode = 9, Name = "Geography" },
                new Lookup { Id = 14, MajorCode = 1, MinorCode = 10, Name = "Computer Science" },
                new Lookup { Id = 15, MajorCode = 1, MinorCode = 11, Name = "Religion" },

                // class (Major Code =2 )
                new Lookup { Id = 16, MajorCode = 2, MinorCode = 0, Name = "class" },
                new Lookup { Id = 17, MajorCode = 2, MinorCode = 1, Name = "A" },
                new Lookup { Id = 18, MajorCode = 2, MinorCode = 2, Name = "B" },
                new Lookup { Id = 19, MajorCode = 2, MinorCode = 3, Name = "C" },

                // GradeLevel (Major Code =3 )
                new Lookup { Id = 20, MajorCode = 3, MinorCode = 0, Name = "GradeLevel" },
                new Lookup { Id = 21, MajorCode = 3, MinorCode = 1, Name = "1" },
                new Lookup { Id = 22, MajorCode = 3, MinorCode = 2, Name = "2" },
                new Lookup { Id = 23, MajorCode = 3, MinorCode = 3, Name = "3" },
                new Lookup { Id = 24, MajorCode = 3, MinorCode = 4, Name = "4" },
                new Lookup { Id = 25, MajorCode = 3, MinorCode = 5, Name = "5" },
                new Lookup { Id = 26, MajorCode = 3, MinorCode = 6, Name = "6" },

                // MonthGrade (Major Code =4 )
                new Lookup { Id = 27, MajorCode = 4, MinorCode = 0, Name = "MonthGrade" },
                new Lookup { Id = 28, MajorCode = 4, MinorCode = 1, Name = "FirstTerm" },
                new Lookup { Id = 29, MajorCode = 4, MinorCode = 2, Name = "SecondTerm" },
                new Lookup { Id = 30, MajorCode = 4, MinorCode = 3, Name = "ThirdTerm" },
                new Lookup { Id = 31, MajorCode = 4, MinorCode = 4, Name = "FinalGrade" }

                );

            //BCrypt.Net.BCrypt.HashPassword("Admin@123") ==> $2a$11$sKaR6ftORxHrM1mQCeg2LOyZCYf5y0mxnp119IcJplnwbGWHBNspO
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, UserName = "Admin", HashedPassword = "$2a$11$sKaR6ftORxHrM1mQCeg2LOyZCYf5y0mxnp119IcJplnwbGWHBNspO", IsAdmin = true }
                 );
                
        }


        //Define Tables

        //Teachers Table
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Lookup> Lookups { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Parent> Parents { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<StudentSAssignments> StudentSAssignments { get; set; }
        public DbSet<User> Users { get; set; }





    }
}

