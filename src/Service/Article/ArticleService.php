<?php

namespace App\Service\Article;

use App\DTO\Api\Article\ArticleCreationDTO;
use App\Entity\Article\Article;
use App\Entity\User\User;
use App\Manager\Article\ArticleManager;

class ArticleService
{
    public function __construct(
        private ArticleManager $manager
    )
    {
    }

    public function createArticle(ArticleCreationDTO $articleCreationDTO, User $user): Article
    {
        $article = new Article();
        $article->setUser($user);
        $article->setTitle($articleCreationDTO->title);
        $article->setContent($articleCreationDTO->content);
        $article->setCreatedAt(new \DateTime('now'));

        $this->manager->create($article);

        return $article;
    }
}
