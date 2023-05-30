<?php

namespace App\DTO\Api\User;

use Doctrine\Common\Collections\Collection;
use JMS\Serializer\Annotation\SerializedName;

class UserProfileResponseDTO
{
    public UserDTO $user;

    public array $articles;
}
