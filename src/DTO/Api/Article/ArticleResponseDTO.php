<?php

namespace App\DTO\Api\Article;

use App\DTO\Api\Category\CategoryDTO;
use App\DTO\Api\User\UserDTO;
use App\Entity\User\User;

class ArticleResponseDTO
{
    public int $id;

    public UserDTO $user;

    public string $title;

    public string $content;

    public \DateTime $createdAt;

    public CategoryDTO $category;

    public string $imageKey;

    public array $comments;

    public int $likes;
}