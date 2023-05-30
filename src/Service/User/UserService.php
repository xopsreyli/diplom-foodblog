<?php

namespace App\Service\User;

use App\DTO\Api\User\UserDTO;
use App\DTO\Api\User\UserProfileResponseDTO;
use App\DTO\Api\User\UserRegistrationDTO;
use App\DTOBuilder\Api\Article\ArticleResponseDTOBuilder;
use App\DTOBuilder\Api\User\UserDTOBuilder;
use App\DTOBuilder\Api\User\UserRegistrationDTOBuilder;
use App\Entity\User\User;
use App\Enum\Minio\ImageBucketsEnum;
use App\Manager\User\UserManager;
use App\Service\Minio\MinioService;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserService
{
    public function __construct(
        private UserManager $manager,
        private UserPasswordHasherInterface $passwordHasher,
        private MinioService $minioService
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

    public function logedUser(?User $user): UserDTO
    {
        if (!$user instanceof User) {
            return new UserDTO();
        }
        return UserDTOBuilder::build($user);
    }

    public function profile(int $id): UserProfileResponseDTO
    {
        $userProfileResponseDTO = new UserProfileResponseDTO();

        $user = $this->manager->getById($id);

        $userProfileResponseDTO->user = UserDTOBuilder::build($user);

        $articles = $user->getArticles()->toArray();
        foreach ($articles as $article) {
            $userProfileResponseDTO->articles[] = ArticleResponseDTOBuilder::build($article);
        }

        return $userProfileResponseDTO;
    }
}