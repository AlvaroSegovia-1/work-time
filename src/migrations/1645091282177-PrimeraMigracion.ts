import {MigrationInterface, QueryRunner} from "typeorm";

export class PrimeraMigracion1645091282177 implements MigrationInterface {
    name = 'PrimeraMigracion1645091282177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "name" character varying, "lastName" character varying, "phoneNumber" integer, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work-time-logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hours" smallint NOT NULL, "date" date NOT NULL, "user_id" integer NOT NULL, "project_id" integer NOT NULL, CONSTRAINT "PK_a22a28169a31ebb39569f5003b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_nests" ("id" SERIAL NOT NULL, "key" character varying(16) NOT NULL, "title" character varying(80) NOT NULL, "description" text NOT NULL, "planned_hours" integer NOT NULL, CONSTRAINT "UQ_32c27404973ad2cae565667607b" UNIQUE ("key"), CONSTRAINT "PK_448731e9b04ec2948016c5edf14" PRIMARY KEY ("id")); COMMENT ON COLUMN "projects_nests"."key" IS 'Key unica del proyecto'; COMMENT ON COLUMN "projects_nests"."title" IS 'Titulo del proyecto'`);
        await queryRunner.query(`ALTER TABLE "work-time-logs" ADD CONSTRAINT "FK_901ebd93779803ce70d4ebc429c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "work-time-logs" ADD CONSTRAINT "FK_7a646e050d0891990981f045f74" FOREIGN KEY ("project_id") REFERENCES "projects_nests"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work-time-logs" DROP CONSTRAINT "FK_7a646e050d0891990981f045f74"`);
        await queryRunner.query(`ALTER TABLE "work-time-logs" DROP CONSTRAINT "FK_901ebd93779803ce70d4ebc429c"`);
        await queryRunner.query(`DROP TABLE "projects_nests"`);
        await queryRunner.query(`DROP TABLE "work-time-logs"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
