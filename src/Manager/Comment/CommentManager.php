<?php

namespace App\Manager\Comment;

use App\Entity\Comment\Comment;
use App\Repository\Comment\CommentRepository;

class CommentManager
{
    public function __construct(
        private CommentRepository $repository
    )
    {
    }

    public function create(Comment $comment): Comment
    {
        $comment = $this->repository->add($comment, true);

        return $comment;
    }
}
