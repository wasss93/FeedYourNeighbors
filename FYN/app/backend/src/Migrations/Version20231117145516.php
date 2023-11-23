<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231117145516 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE announcements ADD is_attributed_to_id INT NOT NULL');
        $this->addSql('ALTER TABLE announcements ADD CONSTRAINT FK_F422A9D1E8F7AA6 FOREIGN KEY (is_attributed_to_id) REFERENCES "users" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_F422A9D1E8F7AA6 ON announcements (is_attributed_to_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE announcements DROP CONSTRAINT FK_F422A9D1E8F7AA6');
        $this->addSql('DROP INDEX IDX_F422A9D1E8F7AA6');
        $this->addSql('ALTER TABLE announcements DROP is_attributed_to_id');
    }
}
