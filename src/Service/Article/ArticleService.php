<?php

namespace App\Service\Article;

use App\DTO\Api\Article\ArticleCreationDTO;
use App\DTO\Api\Article\ArticleCreationResponseDTO;
use App\DTO\Api\Article\ArticleResponseDTO;
use App\DTO\Api\Article\ArticlesResponseDTO;
use App\DTO\Api\Article\ArticleUpdateDTO;
use App\DTO\Api\Category\CategoryDTO;
use App\DTO\Api\User\UserDTO;
use App\DTO\Minio\ImageDTO;
use App\DTOBuilder\Api\Article\ArticleResponseDTOBuilder;
use App\DTOBuilder\Minio\ImageDTOBuilder;
use App\Entity\Article\Article;
use App\Entity\User\User;
use App\Enum\Minio\ImageBucketsEnum;
use App\Manager\Article\ArticleManager;
use App\Manager\Category\CategoryManager;
use App\Service\Minio\MinioService;

class ArticleService
{
    public function __construct(
        private ArticleManager $manager,
        private CategoryManager $categoryManager,
        private MinioService $minioService
    )
    {
    }

    public function createArticle(ArticleCreationDTO $articleCreationDTO, User $user): ArticleCreationResponseDTO
    {
        $article = new Article();
        $article->setUser($user);
        $article->setTitle($articleCreationDTO->title);
        $article->setContent($articleCreationDTO->content);
        $article->setCreatedAt(new \DateTime('now'));
        $category = $this->categoryManager->getCategoryById($articleCreationDTO->categoryId);
        $article->setCategory($category);

        $imageDTO = ImageDTOBuilder::build($articleCreationDTO->image, ImageBucketsEnum::ARTICLE_BUCKET);
        $article->setImageKey($imageDTO->key);

        $this->minioService->uploadFile($imageDTO);

        $article = $this->manager->create($article);

        $response = new ArticleCreationResponseDTO();
        $response->id = $article->getId();

        return $response;
    }

    public function getArticle(int $id): ArticleResponseDTO
    {
        $article = $this->manager->getById($id);

        $articleResponseDTO = ArticleResponseDTOBuilder::build($article);

        return $articleResponseDTO;
    }

    public function delete(int $id, User $user): bool
    {
        $article = $this->manager->getById($id);

        if ($article->getUser() === $user) {
            $article->delete();
            $this->manager->update($article);

            return true;
        }

        return false;
    }

    public function getAllArticles(): ArticlesResponseDTO
    {
        $articles = $this->manager->getAll();

        $response = new ArticlesResponseDTO();
        foreach ($articles as $article) {
            $response->articles[] = ArticleResponseDTOBuilder::build($article);
        }

        return $response;
    }

    public function update(ArticleUpdateDTO $articleUpdateDTO, User $user): ?Article
    {
        dump($articleUpdateDTO);
        $article = $this->manager->getById($articleUpdateDTO->id);

        if ($article->getUser() !== $user) {
            return null;
        }
        if ($articleUpdateDTO->image) {
            $imageDTO = ImageDTOBuilder::build($articleUpdateDTO->image, ImageBucketsEnum::ARTICLE_BUCKET);
            $this->minioService->deleteFile($article->getImageKey(), ImageBucketsEnum::ARTICLE_BUCKET);
            $this->minioService->uploadFile($imageDTO);
            $article->setImageKey($imageDTO->key);
        }
        if ($article->getTitle() !== $articleUpdateDTO->title) {
            $article->setTitle($articleUpdateDTO->title);
        }
        if ($article->getContent() !== $articleUpdateDTO->content) {
            $article->setContent($articleUpdateDTO->content);
        }
        if ($article->getCategory()->getId() !== $articleUpdateDTO->categoryId) {
            $category = $this->categoryManager->getCategoryById($articleUpdateDTO->categoryId);
            $article->setCategory($category);
        }

        $this->manager->update($article);

        return $article;
    }
}
