<?php

namespace App\DTO\Api\Article;

use App\Entity\Category\Category;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;

class ArticleCreationDTO
{
    #[
        SerializedName('image'),
        Assert\NotBlank(),
        Assert\File(
            extensions: ['png', 'jpeg', 'jpg']
        )
    ]
    public UploadedFile $image;

    #[
        SerializedName('title'),
        Assert\NotBlank()
    ]
    public string $title;

    #[
        SerializedName('content'),
        Assert\NotBlank()
    ]
    public string $content;

    #[
        SerializedName('category_id'),
        Assert\NotBlank()
    ]
    public int $categoryId;
}