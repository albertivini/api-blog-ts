import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFavorite1625694969627 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "favorites",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isNullable: false,
                        isPrimary: true
                    },
                    {
                        name: "id_article",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "id_user",
                        type: "uuid",
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKArticleFavorite",
                        referencedTableName: "articles",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_article"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKUserFavorite",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_user"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
