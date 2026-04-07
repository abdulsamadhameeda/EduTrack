using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduTrack.Migrations
{
    /// <inheritdoc />
    public partial class RenameGradeprop : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Grades_Lookups_GradeMonth",
                table: "Grades");

            migrationBuilder.RenameColumn(
                name: "GradeMonth",
                table: "Grades",
                newName: "GradeMonthId");

            migrationBuilder.RenameIndex(
                name: "IX_Grades_GradeMonth",
                table: "Grades",
                newName: "IX_Grades_GradeMonthId");

            migrationBuilder.AddForeignKey(
                name: "FK_Grades_Lookups_GradeMonthId",
                table: "Grades",
                column: "GradeMonthId",
                principalTable: "Lookups",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Grades_Lookups_GradeMonthId",
                table: "Grades");

            migrationBuilder.RenameColumn(
                name: "GradeMonthId",
                table: "Grades",
                newName: "GradeMonth");

            migrationBuilder.RenameIndex(
                name: "IX_Grades_GradeMonthId",
                table: "Grades",
                newName: "IX_Grades_GradeMonth");

            migrationBuilder.AddForeignKey(
                name: "FK_Grades_Lookups_GradeMonth",
                table: "Grades",
                column: "GradeMonth",
                principalTable: "Lookups",
                principalColumn: "Id");
        }
    }
}
