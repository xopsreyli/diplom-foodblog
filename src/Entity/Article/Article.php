<?php

namespace App\Entity\Article;

use App\Entity\User\User;
use App\Repository\Article\ArticleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[
    ORM\Entity(repositoryClass: ArticleRepository::class),
    ORM\Table('articles'),
]
class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'articles')]
    private User $user;

    #[ORM\Column(name: 'title', type: Types::STRING, nullable: false)]
    private string $title;

    #[ORM\Column(name: 'content', type: Types::STRING, nullable: false)]
    private string $content;

    #[ORM\Column(name: 'created_at', type: Types::DATETIME_MUTABLE, nullable: false)]
    private \DateTime $createdAt;

    //TODO: добавать класс категорий
//    private string $category;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getContent(): string
    {
        return $this->content;
    }

    /**
     * @param string $content
     */
    public function setContent(string $content): void
    {
        $this->content = $content;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }

    /**
     * @param \DateTime $createdAt
     */
    public function setCreatedAt(\DateTime $createdAt): void
    {
        $this->createdAt = $createdAt;
    }
}
