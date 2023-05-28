<?php

namespace App\Manager\User;

use App\Entity\User\User;
use App\Repository\User\UserRepository;

class UserManager
{
    public function __construct(
        private UserRepository $repository
    )
    {
    }

    public function create($user): User
    {
        $user = $this->repository->add($user, true);

        return $user;
    }

    public function getById(int $id): User
    {
        return $this->repository->find($id);
    }
}