import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1752694138800 implements MigrationInterface {
    name = 'Migrations1752694138800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`enderecos\` (\`id\` varchar(36) NOT NULL, \`street\` varchar(100) NOT NULL, \`district\` varchar(100) NOT NULL, \`number\` int NOT NULL, \`city\` varchar(50) NOT NULL, \`state\` enum ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`email\` varchar(1000) NOT NULL, \`biography\` text NOT NULL, \`dateOfBirth\` date NOT NULL, \`base64Image\` longtext NOT NULL, \`base64ImageName\` varchar(25) NOT NULL, \`addressId\` varchar(36) NULL, UNIQUE INDEX \`REL_2bf9c14ae0b5b4111c7c8aae11\` (\`addressId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD CONSTRAINT \`FK_2bf9c14ae0b5b4111c7c8aae117\` FOREIGN KEY (\`addressId\`) REFERENCES \`enderecos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP FOREIGN KEY \`FK_2bf9c14ae0b5b4111c7c8aae117\``);
        await queryRunner.query(`DROP INDEX \`REL_2bf9c14ae0b5b4111c7c8aae11\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`enderecos\``);
    }

}
