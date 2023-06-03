<?php

namespace App\DTO\Api\Comment;

use JMS\Serializer\Annotation\SerializedName;

class CommentCreationDTO
{
    #[SerializedName('text')]
    public string $text;

    #[SerializedName('article_id')]
    public int $articleId;
}
