<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231117145152 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE users ADD first_name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE users ADD last_name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE users ADD birth_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE users ADD ville VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE users ADD departement VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE users ADD numero_rue VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE users ADD rue VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE users ADD code_postal VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "users" DROP first_name');
        $this->addSql('ALTER TABLE "users" DROP last_name');
        $this->addSql('ALTER TABLE "users" DROP birth_date');
        $this->addSql('ALTER TABLE "users" DROP ville');
        $this->addSql('ALTER TABLE "users" DROP departement');
        $this->addSql('ALTER TABLE "users" DROP numero_rue');
        $this->addSql('ALTER TABLE "users" DROP rue');
        $this->addSql('ALTER TABLE "users" DROP code_postal');
    }
}
