using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduTrack.Migrations
{
    /// <inheritdoc />
    public partial class new_property_lookup_Grades : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "GradeMonth",
                table: "Grades",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Grades_GradeMonth",
                table: "Grades",
                column: "GradeMonth");

            migrationBuilder.AddForeignKey(
                name: "FK_Grades_Lookups_GradeMonth",
                table: "Grades",
                column: "GradeMonth",
                principalTable: "Lookups",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Grades_Lookups_GradeMonth",
                table: "Grades");

            migrationBuilder.DropIndex(
                name: "IX_Grades_GradeMonth",
                table: "Grades");

            migrationBuilder.DropColumn(
                name: "GradeMonth",
                table: "Grades");
        }
    }
}
