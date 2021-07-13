import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFollows1625699414181 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "follows",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: "id_segue",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "id_seguido",
                        type: "uuid",
                        isNullable: false
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUserSegue",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_segue"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKUserSeguido",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_seguido"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("follows")
    }

}
