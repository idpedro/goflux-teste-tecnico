import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createTableProposals1636666746798 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "goflux_proposals",
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
            enum: ["accepted", "recused", "waiting"],
            enumName: "proposalsStateEnum",
            default: "'waiting'",
          },
          {
            name: "id_user",
            type: "int",
            unsigned: true,
          },
          {
            name: "id_offer",
            type: "int",
            unsigned: true,
          },
          {
            name: "value",
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
      "goflux_proposals",
      new TableForeignKey({
        name: "fk_offer",
        columnNames: ["id_offer"],
        referencedColumnNames: ["id"],
        referencedTableName: "goflux_offers",
        onDelete: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
      "goflux_proposals",
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
    await queryRunner.dropForeignKey("goflux_proposals", "fk_user");
    await queryRunner.dropForeignKey("goflux_proposals", "fk_offer");
    await queryRunner.dropTable("goflux_proposals");
  }
}
