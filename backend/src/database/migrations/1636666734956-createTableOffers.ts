import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createTableOffers1636666734956 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "goflux_offers",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "status",
            type: "enum",
            enum: ["active", "closed", "validated"],
            enumName: "offersStateEnum",
            default: "'active'",
          },
          {
            name: "id_user",
            type: "int",
            unsigned: true,
            isUnique: false,
          },
          {
            name: "from",
            type: "varchar",
            isUnique: true,
            length: "150",
          },
          {
            name: "to",
            type: "varchar",
            isUnique: true,
            length: "150",
          },
          {
            name: "initial_value",
            type: "double precision",
            unsigned: true,
            isNullable: false,
          },
          {
            name: "amount",
            type: "double precision",
            unsigned: true,
            isNullable: false,
          },
          {
            name: "amount_type",
            type: "enum",
            enum: ["TON", "KG", "G"],
            enumName: "typeAmountEnum",
            default: "'KG'",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "goflux_offers",
      new TableForeignKey({
        name: "fk_user",
        columnNames: ["id_user"],
        referencedColumnNames: ["id"],
        referencedTableName: "goflux_users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("goflux_offers", "fk_user");
    await queryRunner.dropTable("goflux_offers");
  }
}
