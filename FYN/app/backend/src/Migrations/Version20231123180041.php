<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231123180041 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE announcements_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE messages_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "users_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE announcements (id INT NOT NULL, owner_id INT NOT NULL, is_attributed_to_id INT NOT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, categorie VARCHAR(255) NOT NULL, date DATE NOT NULL, limit_date DATE NOT NULL, status BOOLEAN NOT NULL, ville VARCHAR(255) NOT NULL, departement VARCHAR(255) NOT NULL, numero_rue VARCHAR(255) NOT NULL, rue VARCHAR(255) NOT NULL, code_postal VARCHAR(255) NOT NULL, complement VARCHAR(255) NOT NULL, allergenes BOOLEAN DEFAULT NULL, poids VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_F422A9D7E3C61F9 ON announcements (owner_id)');
        $this->addSql('CREATE INDEX IDX_F422A9D1E8F7AA6 ON announcements (is_attributed_to_id)');
        $this->addSql('CREATE TABLE messages (id INT NOT NULL, sender_id INT NOT NULL, recipient_id INT NOT NULL, content VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DB021E96F624B39D ON messages (sender_id)');
        $this->addSql('CREATE INDEX IDX_DB021E96E92F8F78 ON messages (recipient_id)');
        $this->addSql('CREATE TABLE "users" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, username VARCHAR(255) DEFAULT NULL, status_user BOOLEAN NOT NULL, complement VARCHAR(255) NOT NULL, code_postal VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, birth_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, ville VARCHAR(255) NOT NULL, departement VARCHAR(255) NOT NULL, numero_rue VARCHAR(255) NOT NULL, numero_tel VARCHAR(255) NOT NULL, is_verified BOOLEAN NOT NULL, rue VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1483A5E9E7927C74 ON "users" (email)');
        $this->addSql('ALTER TABLE announcements ADD CONSTRAINT FK_F422A9D7E3C61F9 FOREIGN KEY (owner_id) REFERENCES "users" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE announcements ADD CONSTRAINT FK_F422A9D1E8F7AA6 FOREIGN KEY (is_attributed_to_id) REFERENCES "users" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E96F624B39D FOREIGN KEY (sender_id) REFERENCES "users" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E96E92F8F78 FOREIGN KEY (recipient_id) REFERENCES "users" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE announcements_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE messages_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "users_id_seq" CASCADE');
        $this->addSql('ALTER TABLE announcements DROP CONSTRAINT FK_F422A9D7E3C61F9');
        $this->addSql('ALTER TABLE announcements DROP CONSTRAINT FK_F422A9D1E8F7AA6');
        $this->addSql('ALTER TABLE messages DROP CONSTRAINT FK_DB021E96F624B39D');
        $this->addSql('ALTER TABLE messages DROP CONSTRAINT FK_DB021E96E92F8F78');
        $this->addSql('DROP TABLE announcements');
        $this->addSql('DROP TABLE messages');
        $this->addSql('DROP TABLE "users"');
    }
}
