import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1625699407209 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: "username",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "bio",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "image",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "tagList",
                        type: "varchar",
                        isNullable: true
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }
}
