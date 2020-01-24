using Microsoft.EntityFrameworkCore.Migrations;

namespace AgiBackEnd.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Company",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExternalId = table.Column<string>(maxLength: 50, nullable: false),
                    TradingName = table.Column<string>(nullable: false),
                    LegalName = table.Column<string>(nullable: false),
                    CompanyType = table.Column<int>(nullable: false),
                    Unused = table.Column<bool>(nullable: false),
                    IsForwarder = table.Column<bool>(nullable: false),
                    Phone = table.Column<string>(maxLength: 50, nullable: true),
                    Fax = table.Column<string>(maxLength: 50, nullable: true),
                    AddressId = table.Column<int>(nullable: false),
                    MailAddressId = table.Column<int>(nullable: false),
                    IsCustomClearance = table.Column<bool>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    IsCarrier = table.Column<bool>(nullable: false),
                    ChamberOfCommerce = table.Column<string>(nullable: true),
                    ChamberOfCommerceCi = table.Column<string>(nullable: true),
                    CountryVat = table.Column<string>(nullable: true),
                    IsExchangeBroker = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Company", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Company");
        }
    }
}
