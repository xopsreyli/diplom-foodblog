<?php

namespace App\Service\Comment;

use App\DTO\Api\Comment\CommentCreationDTO;
use App\Entity\Comment\Comment;
use App\Entity\User\User;
use App\Manager\Article\ArticleManager;
use App\Manager\Comment\CommentManager;

class CommentService
{
    public function __construct(
        private CommentManager $manager,
        private ArticleManager $articleManager
    )
    {
    }

    public function createComment(CommentCreationDTO $commentCreationDTO, User $user): Comment
    {
        $comment = new Comment();
        $comment->setUser($user);
        $comment->setText($commentCreationDTO->text);

        $article = $this->articleManager->getById($commentCreationDTO->articleId);
        $comment->setArticle($article);

        $this->manager->create($comment);

        return $comment;
    }
}
