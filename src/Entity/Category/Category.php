<?php

namespace App\Entity\Category;

use App\Entity\Article\Article;
use App\Repository\Category\CategoryRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[
    ORM\Entity(repositoryClass: CategoryRepository::class),
    ORM\Table('categories'),
]
class Category
{
    #[
        ORM\Id,
        ORM\GeneratedValue,
        ORM\Column
    ]
    private ?int $id = null;

    #[ORM\Column(name: 'name',type: Types::STRING,nullable: false)]
    private string $name;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: Article::class)]
    private ?Collection $articles = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }


}
