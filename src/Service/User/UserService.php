<?php

namespace App\Service\User;

use App\DTO\Api\User\UserRegistrationDTO;
use App\DTOBuilder\Api\User\UserRegistrationDTOBuilder;
use App\Entity\User\User;
use App\Manager\User\UserManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserService
{
    public function __construct(
        private UserManager $manager,
        private UserPasswordHasherInterface $passwordHasher
    )
    {
    }

    public function registration(UserRegistrationDTO $userRegistrationDTO): User
    {
        $user = UserRegistrationDTOBuilder::build($userRegistrationDTO);

        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $user->getPassword()
        );

        $user->setPassword($hashedPassword);

        $this->manager->create($user);

        return $user;
    }
}