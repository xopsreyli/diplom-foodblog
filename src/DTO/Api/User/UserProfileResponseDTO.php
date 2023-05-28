<?php

namespace App\DTO\Api\User;

use Doctrine\Common\Collections\Collection;
use JMS\Serializer\Annotation\SerializedName;

class UserProfileResponseDTO
{
    #[SerializedName('id')]
    public int $id;

    #[SerializedName('nickname')]
    public string $nickname;

    #[SerializedName('articles')]
    public array $articles;
}
