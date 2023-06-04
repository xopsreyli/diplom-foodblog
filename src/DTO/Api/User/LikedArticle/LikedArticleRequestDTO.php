<?php

namespace App\DTO\Api\User\LikedArticle;

use JMS\Serializer\Annotation\SerializedName;

class LikedArticleRequestDTO
{
    #[SerializedName('id')]
    public int $id;
}