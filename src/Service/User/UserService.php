<?php

namespace App\Service\User;

use App\DTO\Api\User\CodeDTO;
use App\DTO\Api\User\FollowersDTO;
use App\DTO\Api\User\FollowRequestDTO;
use App\DTO\Api\User\IsFollowedDTO;
use App\DTO\Api\User\PasswordDTO;
use App\DTO\Api\User\UserDTO;
use App\DTO\Api\User\UserProfileResponseDTO;
use App\DTO\Api\User\UserRegistrationDTO;
use App\DTO\Api\User\UserUpdateDTO;
use App\DTOBuilder\Api\Article\ArticleResponseDTOBuilder;
use App\DTOBuilder\Api\User\UserDTOBuilder;
use App\DTOBuilder\Api\User\UserRegistrationDTOBuilder;
use App\DTOBuilder\Minio\ImageDTOBuilder;
use App\Entity\User\User;
use App\Enum\Minio\ImageBucketsEnum;
use App\Manager\Article\ArticleManager;
use App\Manager\User\UserManager;
use App\Service\Minio\MinioService;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserService
{
    public function __construct(
        private UserManager $manager,
        private UserPasswordHasherInterface $passwordHasher,
        private MinioService $minioService,
        private ArticleManager $articleManager,
        private MailerInterface $mailer,
        private RequestStack $requestStack,
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

    public function profile(int $id): ?UserProfileResponseDTO
    {
        $userProfileResponseDTO = new UserProfileResponseDTO();

        $user = $this->manager->getById($id);
        if (null === $user) {
            return null;
        }

        $userProfileResponseDTO->user = UserDTOBuilder::build($user);

        $userProfileResponseDTO->followers = $user->getFollowers()->count();
        $userProfileResponseDTO->follows = $user->getFollows()->count();

        $articles = $this->articleManager->getNonDeletedByUser($user);
        foreach ($articles as $article) {
            $userProfileResponseDTO->articles[] = ArticleResponseDTOBuilder::build($article);
        }

        return $userProfileResponseDTO;
    }

    public function update(UserUpdateDTO $userUpdateDTO, User $user): User
    {
        if ($user->getNickname() !== $userUpdateDTO->nickname) {
            $user->setNickname($userUpdateDTO->nickname);
        }

        if ($userUpdateDTO->image) {
            if ($user->getImageKey()) {
                $this->minioService->deleteFile($user->getImageKey(), ImageBucketsEnum::USER_BUCKET);
            }
            $imageDTO = ImageDTOBuilder::build($userUpdateDTO->image, ImageBucketsEnum::USER_BUCKET);
            $user->setImageKey($imageDTO->key);

            $this->minioService->uploadFile($imageDTO);
        }

        $user = $this->manager->update($user);

        return $user;
    }

    public function follow(FollowRequestDTO $followRequestDTO, User $user): User
    {
        $targetUser = $this->manager->getById($followRequestDTO->id);
        if ($user->getFollows()->contains($targetUser)) {
            $user->getFollows()->removeElement($targetUser);
        } else {
            $user->getFollows()->add($targetUser);
        }

        $this->manager->update($user);

        return $user;
    }

    public function isFollowed(FollowRequestDTO $followRequestDTO, User $user): IsFollowedDTO
    {
        $response = new IsFollowedDTO();

        $targetUser = $this->manager->getById($followRequestDTO->id);
        if ($user->getFollows()->contains($targetUser)) {
            $response->isFollowed = true;
        } else {
            $response->isFollowed = false;
        }

        return $response;
    }

    public function followers(int $id): FollowersDTO
    {
        $followersDTO = new FollowersDTO();
        $user = $this->manager->getById($id);

        $followers = $user->getFollowers()->toArray();
        foreach ($followers as $follower) {
            $followersDTO->followers[] = UserDTOBuilder::build($follower);
        }

        return $followersDTO;
    }

    public function follows(int $id): FollowersDTO
    {
        $followersDTO = new FollowersDTO();
        $user = $this->manager->getById($id);

        $follows = $user->getFollows()->toArray();
        foreach ($follows as $follower) {
            $followersDTO->followers[] = UserDTOBuilder::build($follower);
        }

        return $followersDTO;
    }

    public function getPasswordToResetAndSendCode(PasswordDTO $passwordDTO, User $user): bool
    {
        if ($this->passwordHasher->isPasswordValid($user, $passwordDTO->password)) {
            $code = rand(1000, 9999);
            $session = $this->requestStack->getSession();
            $name = 'user_' . $user->getId() . '_code';
            $session->set($name, $code);

            $text = 'Here is your code to restore password:' . $code;

            $email = (new Email())
                ->from('foodblog@gmail.com')
                ->to($user->getEmail())
                ->subject('Password restore')
                ->text($text)
            ;

            $this->mailer->send($email);

            return true;
        }

        return false;
    }

    public function checkCodeToResetPassword(CodeDTO $codeDTO, User $user): bool
    {
        $session = $this->requestStack->getSession();
        $name = 'user_' . $user->getId() . '_code';
        if ($session->get($name) === $codeDTO->code) {
            $session->clear();
            return true;
        }

        return false;
    }

    public function resetPassword(PasswordDTO $passwordDTO, User $user): User
    {
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $passwordDTO->password
        );

        $user->setPassword($hashedPassword);

        $this->manager->update($user);

        return $user;
    }
}