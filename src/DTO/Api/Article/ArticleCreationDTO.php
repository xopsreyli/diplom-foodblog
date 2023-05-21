<?php

namespace App\DTO\Api\Article;

use JMS\Serializer\Annotation\SerializedName;

class ArticleCreationDTO
{
    #[SerializedName('title')]
    public string $title;

    #[SerializedName('content')]
    public string $content;
}