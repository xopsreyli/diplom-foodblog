<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230608114232 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE follows (user_id INT NOT NULL, follows_user_id INT NOT NULL, INDEX IDX_4B638A73A76ED395 (user_id), INDEX IDX_4B638A737CDC058B (follows_user_id), PRIMARY KEY(user_id, follows_user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE follows ADD CONSTRAINT FK_4B638A73A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE follows ADD CONSTRAINT FK_4B638A737CDC058B FOREIGN KEY (follows_user_id) REFERENCES users (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE follows DROP FOREIGN KEY FK_4B638A73A76ED395');
        $this->addSql('ALTER TABLE follows DROP FOREIGN KEY FK_4B638A737CDC058B');
        $this->addSql('DROP TABLE follows');
    }
}
