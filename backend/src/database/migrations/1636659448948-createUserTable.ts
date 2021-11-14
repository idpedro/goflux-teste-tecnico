import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUserTable1636659448948 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "goflux_users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "type",
            type: "enum",
            enum: ["providers", "customer"],
            enumName: "userType",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
            length: "150",
          },
          {
            name: "doc",
            type: "varchar",
            unsigned: true,
            isUnique: true,
            width: 14,
          },
          {
            name: "about",
            type: "varchar",
            isNullable: true,
            length: "254",
          },
          {
            name: "active",
            type: "boolean",
            isNullable: false,
            default: true,
          },
          {
            name: "site",
            type: "varchar",
            isNullable: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("goflux_users");
  }
}
