<?php

namespace App\Manager\Article;

use App\Entity\Article\Article;
use App\Entity\User\User;
use App\Repository\Article\ArticleRepository;

class ArticleManager
{
    public function __construct(
        private ArticleRepository $repository
    )
    {
    }

    public function create(Article $article): Article
    {
        $article = $this->repository->add($article, true);

        return $article;
    }

    public function update(Article $article): Article
    {
        $article = $this->repository->save($article);

        return $article;
    }

    public function getById(int $id): ?Article
    {
        return $this->repository->findOneBy([
            'id' => $id,
            'deleted' => false,
        ]);
    }

    public function getNonDeletedByUser(User $user): array
    {
        return $this->repository->findBy([
            'user' => $user,
            'deleted' => false,
        ]);
    }

    public function getAll(): array
    {
        return $this->repository->findBy([
            'deleted' => false,
        ]);
    }

    public function latest10(): array
    {
        return $this->repository->latest10();
    }

    public function popular(): array
    {
        return $this->repository->popular();
    }
}
