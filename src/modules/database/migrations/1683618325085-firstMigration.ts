import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1683618325085 implements MigrationInterface {
    name = 'FirstMigration1683618325085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cards\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) COLLATE "utf8mb4_unicode_ci" NOT NULL, \`owner_id\` int NOT NULL, \`card_type\` enum ('Gold', 'Silver', 'Iron', 'Composite') NOT NULL DEFAULT 'Iron', \`card_state\` enum ('active', 'deleted') NOT NULL DEFAULT 'active', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`cards\``);
    }

}
