<?php

namespace App\DTO\Api\Article;

use App\Entity\Category\Category;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ArticleCreationDTO
{
    #[SerializedName('image')]
    public UploadedFile $image;

    #[SerializedName('title')]
    public string $title;

    #[SerializedName('content')]
    public string $content;

    #[SerializedName('category_id')]
    public int $categoryId;
}