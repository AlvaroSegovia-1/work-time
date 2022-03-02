import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedUserProfile1646213080459 implements MigrationInterface {
    name = 'AddedUserProfile1646213080459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_8c154faf15b98f494723d9cc45b"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "UQ_8c154faf15b98f494723d9cc45b" UNIQUE ("profile_id")`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_8c154faf15b98f494723d9cc45b" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_8c154faf15b98f494723d9cc45b"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "UQ_8c154faf15b98f494723d9cc45b"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_8c154faf15b98f494723d9cc45b" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
