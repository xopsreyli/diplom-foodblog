<?php

namespace App\Manager\Article;

use App\Entity\Article\Article;
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

    public function getById(int $id): Article
    {
        return $this->repository->find($id);
    }
}
