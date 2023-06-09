<?php

namespace App\DTO\Api\Comment;

use App\DTO\Api\User\UserDTO;

class CommentDTO
{
    public UserDTO $userDTO;

    public string $text;

    public \DateTime $createdAt;
}