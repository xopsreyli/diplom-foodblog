<?php

namespace App\Entity\Article;

use App\Entity\Category\Category;
use App\Entity\Comment\Comment;
use App\Entity\User\User;
use App\Repository\Article\ArticleRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[
    ORM\Entity(repositoryClass: ArticleRepository::class),
    ORM\Table('articles'),
]
class Article
{
    #[
        ORM\Id,
        ORM\GeneratedValue,
        ORM\Column
    ]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'articles')]
    private User $user;

    #[ORM\Column(name: 'title', type: Types::STRING, nullable: false)]
    private string $title;

    #[ORM\Column(name: 'content', type: Types::TEXT, nullable: false)]
    private string $content;

    #[ORM\Column(name: 'created_at', type: Types::DATETIME_MUTABLE, nullable: false)]
    private \DateTime $createdAt;

    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: 'articles')]
    private Category $category;

    #[ORM\Column(name: 'image_key', type: Types::STRING, nullable: false)]
    private string $imageKey;

    #[ORM\Column(name: 'likes', type: Types::INTEGER, nullable: false)]
    private int $likes = 0;

    #[ORM\Column(name: 'deleted', type: Types::BOOLEAN, nullable: false)]
    private bool $deleted = false;

    #[ORM\OneToMany(mappedBy: 'article', targetEntity: Comment::class)]
    private Collection $comments;

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

    public function getCategory(): Category
    {
        return $this->category;
    }

    public function setCategory(Category $category): void
    {
        $this->category = $category;
    }

    /**
     * @return string
     */
    public function getImageKey(): string
    {
        return $this->imageKey;
    }

    /**
     * @param string $content
     */
    public function setImageKey(string $imageKey): void
    {
        $this->imageKey = $imageKey;
    }

    /**
     * @return Collection
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    /**
     * @return int
     */
    public function getLikes(): int
    {
        return $this->likes;
    }

    /**
     * @param int $likes
     */
    public function setLikes(int $likes): void
    {
        $this->likes = $likes;
    }

    public function isDeleted(): bool
    {
        return $this->deleted;
    }

    public function delete(): void
    {
        $this->deleted = true;
    }
}
