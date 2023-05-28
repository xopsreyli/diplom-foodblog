<?php

namespace App\DTOBuilder\Api\Article;

use App\DTO\Api\Article\ArticleResponseDTO;
use App\DTOBuilder\Api\Category\CategoryDTOBuilder;
use App\DTOBuilder\Api\User\UserDTOBuilder;
use App\Entity\Article\Article;

class ArticleResponseDTOBuilder
{
    public static function build(Article $article): ArticleResponseDTO
    {
        $articleResponseDTO = new ArticleResponseDTO();
        $articleResponseDTO->id = $article->getId();
        $articleResponseDTO->user = UserDTOBuilder::build($article->getUser());
        $articleResponseDTO->title = $article->getTitle();
        $articleResponseDTO->content = $article->getContent();
        $articleResponseDTO->createdAt = $article->getCreatedAt();
        $articleResponseDTO->category = CategoryDTOBuilder::build($article->getCategory());
        $articleResponseDTO->imageKey = $article->getImageKey();

        return $articleResponseDTO;
    }
}
