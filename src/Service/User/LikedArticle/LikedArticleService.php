<?php

namespace App\Service\User\LikedArticle;

use App\DTO\Api\User\LikedArticle\IsLikedDTO;
use App\DTO\Api\User\LikedArticle\LikedArticleRequestDTO;
use App\Entity\User\LikedArticle\LikedArticle;
use App\Entity\User\User;
use App\Manager\Article\ArticleManager;
use App\Manager\User\LikedArticle\LikedArticleManager;

class LikedArticleService
{
    public function __construct(
        private LikedArticleManager $manager,
        private ArticleManager $articleManager
    )
    {
    }

    public function like(LikedArticleRequestDTO $likedArticleRequestDTO, User $user): LikedArticle
    {
        $likedArticle = $this->manager->findByUserAndArticleId($user->getId(), $likedArticleRequestDTO->id);
        $article = $this->articleManager->getById($likedArticleRequestDTO->id);

        if (!$likedArticle instanceof LikedArticle) {
            $likedArticle = new LikedArticle();
            $likedArticle->setUser($user);
            $likedArticle->setArticleId($likedArticleRequestDTO->id);
            $likedArticle->like();

            $this->manager->create($likedArticle);

            $article->setLikes($article->getLikes() + 1);
            $this->articleManager->update($article);
        } elseif ($likedArticle->isLiked()) {
            $likedArticle->dislike();
            $this->manager->update($likedArticle);

            $article->setLikes($article->getLikes() - 1);
            $this->articleManager->update($article);
        } else {
            $likedArticle->like();
            $this->manager->update($likedArticle);

            $article->setLikes($article->getLikes() + 1);
            $this->articleManager->update($article);
        }

        return $likedArticle;
    }

    public function isLiked(int $id, User $user): IsLikedDTO
    {
        $isLikedDTO = new IsLikedDTO();
        $likedArticle = $this->manager->findByUserAndArticleId($user->getId(), $id);

        if (!$likedArticle instanceof LikedArticle) {
            $isLikedDTO->isLiked = false;
        } elseif ($likedArticle->isLiked()) {
            $isLikedDTO->isLiked = true;
        } else {
            $isLikedDTO->isLiked = false;
        }

        return $isLikedDTO;
    }
}
