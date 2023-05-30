<?php

namespace App\Entity\User;

use App\Entity\Article\Article;
use App\Repository\User\UserRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[
    ORM\Entity(repositoryClass: UserRepository::class),
    ORM\Table('users'),
]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[
        ORM\Id,
        ORM\GeneratedValue,
        ORM\Column,
    ]
    private ?int $id = null;

    #[ORM\Column(name: 'email', type: Types::STRING,  length: 180, unique: true, nullable: false)]
    private string $email;

    #[ORM\Column(name: 'nickname', type: Types::STRING, length: 30, unique: true, nullable: false)]
    private string $nickname;

    #[ORM\Column(name: 'roles', type: Types::JSON, nullable: false)]
    private array $roles = [];

    #[ORM\Column(name: 'password', type: Types::STRING, nullable: false)]
    private string $password;

    #[ORM\Column(name: 'image_key', type: Types::STRING, nullable: true)]
    private ?string $imageKey = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Article::class)]
    private ?Collection $articles = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getNickname(): string
    {
        return $this->nickname;
    }

    public function setNickname(string $nickname): void
    {
        $this->nickname = $nickname;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): void
    {
        $this->roles = $roles;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return string|null
     */
    public function getImageKey(): ?string
    {
        return $this->imageKey;
    }

    /**
     * @param string|null $imageKey
     */
    public function setImageKey(?string $imageKey): void
    {
        $this->imageKey = $imageKey;
    }

    /**
     * @return Collection|null
     */
    public function getArticles(): ?Collection
    {
        return $this->articles;
    }


}
