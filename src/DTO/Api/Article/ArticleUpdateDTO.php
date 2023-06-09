<?php

namespace App\DTO\Api\Article;

use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ArticleUpdateDTO
{
    #[SerializedName('id')]
    public int $id;

    #[SerializedName('image')]
    public ?UploadedFile $image = null;

    #[SerializedName('title')]
    public string $title;

    #[SerializedName('content')]
    public string $content;

    #[SerializedName('category_id')]
    public int $categoryId;
}