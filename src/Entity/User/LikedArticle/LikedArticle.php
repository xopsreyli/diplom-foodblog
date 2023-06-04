<?php

namespace App\Entity\User\LikedArticle;

use App\Entity\User\User;
use App\Repository\User\LikedArticle\LikedArticlesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[
    ORM\Entity(repositoryClass: LikedArticlesRepository::class),
    ORM\Table('liked_articles')
]
class LikedArticle
{
    #[
        ORM\Id,
        ORM\GeneratedValue,
        ORM\Column
    ]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'likedArticles')]
    private User $user;

    #[ORM\Column(name: 'article_id', type: Types::INTEGER, nullable: false)]
    private int $articleId;

    #[ORM\Column(name: 'is_liked', type: Types::BOOLEAN, nullable: false)]
    private bool $isLiked = false;

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
     * @return int
     */
    public function getArticleId(): int
    {
        return $this->articleId;
    }

    /**
     * @param int $articleId
     */
    public function setArticleId(int $articleId): void
    {
        $this->articleId = $articleId;
    }

    /**
     * @return bool
     */
    public function isLiked(): bool
    {
        return $this->isLiked;
    }

    public function like(): void
    {
        $this->isLiked = true;
    }

    public function dislike(): void
    {
        $this->isLiked = false;
    }
}
