<?php

namespace App\DTOBuilder\Api\User;

use App\DTO\Api\User\UserDTO;
use App\Entity\User\User;

class UserDTOBuilder
{
    public static function build(User $user): UserDTO
    {
        $userDTO = new UserDTO();
        $userDTO->id = $user->getId();
        $userDTO->email = $user->getEmail();
        $userDTO->nickname = $user->getNickname();
        $userDTO->roles = $user->getRoles();

        return $userDTO;
    }
}
