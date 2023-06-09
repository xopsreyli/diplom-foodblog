<?php

namespace App\DTOBuilder\Api\Comment;

use App\DTO\Api\Comment\CommentDTO;
use App\DTOBuilder\Api\User\UserDTOBuilder;
use App\Entity\Comment\Comment;

class CommentDTOBuilder
{
    public static function build(Comment $comment): CommentDTO
    {
        $commentDTO = new CommentDTO();
        $commentDTO->userDTO = UserDTOBuilder::build($comment->getUser());
        $commentDTO->text = $comment->getText();
        $commentDTO->createdAt = $comment->getCreatedAt();

        return $commentDTO;
    }
}