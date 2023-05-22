<?php

namespace App\DTOBuilder\Api\User;

use App\DTO\Api\User\UserRegistrationDTO;
use App\Entity\User\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserRegistrationDTOBuilder
{
    public static function build(UserRegistrationDTO $userRegistrationDTO): User
    {
        $user = new User();

        $user->setEmail($userRegistrationDTO->email)
            ->setNickname($userRegistrationDTO->nickname)
            ->setPassword($userRegistrationDTO->password)
        ;


        return $user;
    }
}