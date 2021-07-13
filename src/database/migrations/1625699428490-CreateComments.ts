import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateComments1625699428490 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "comments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: "id_user",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "id_article",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "body",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKCommentUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_user"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKCommentArticle",
                        referencedTableName: "articles",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_article"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("comments")
    }
}
