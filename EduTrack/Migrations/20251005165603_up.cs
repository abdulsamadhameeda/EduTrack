using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduTrack.Migrations
{
    /// <inheritdoc />
    public partial class up : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Grades_Lookups_SubjectId",
                table: "Grades");

            migrationBuilder.AlterColumn<long>(
                name: "SubjectId",
                table: "Grades",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Grades_Lookups_SubjectId",
                table: "Grades",
                column: "SubjectId",
                principalTable: "Lookups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Grades_Lookups_SubjectId",
                table: "Grades");

            migrationBuilder.AlterColumn<long>(
                name: "SubjectId",
                table: "Grades",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "FK_Grades_Lookups_SubjectId",
                table: "Grades",
                column: "SubjectId",
                principalTable: "Lookups",
                principalColumn: "Id");
        }
    }
}
