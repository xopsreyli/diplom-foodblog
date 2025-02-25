<?php

namespace App\DTO\Api\User;

use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class UserUpdateDTO
{
    #[SerializedName('image')]
    public ?UploadedFile $image = null;

    #[SerializedName('nickname')]
    public string $nickname;
}