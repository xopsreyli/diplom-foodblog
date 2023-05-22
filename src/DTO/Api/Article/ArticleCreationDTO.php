<?php

namespace App\DTO\Api\Article;

use App\Entity\Category\Category;
use JMS\Serializer\Annotation\SerializedName;

class ArticleCreationDTO
{
    #[SerializedName('title')]
    public string $title;

    #[SerializedName('content')]
    public string $content;

    #[SerializedName('category_id')]
    public int $categoryId;
}