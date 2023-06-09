<?php

namespace App\Manager\User\LikedArticle;

use App\Entity\User\LikedArticle\LikedArticle;
use App\Repository\User\LikedArticle\LikedArticlesRepository;

class LikedArticleManager
{
    public function __construct(
        private LikedArticlesRepository $repository
    )
    {
    }

    public function create(LikedArticle $likedArticles): LikedArticle
    {
        $likedArticles = $this->repository->add($likedArticles, true);

        return $likedArticles;
    }

    public function update(LikedArticle $likedArticle): LikedArticle
    {
        $likedArticle = $this->repository->save($likedArticle);

        return $likedArticle;
    }

    public function findByUserAndArticleId(int $userId, int $articleId): ?LikedArticle
    {
        return $this->repository->findOneBy([
            'user' => $userId,
            'articleId' => $articleId
        ]);
    }
}
