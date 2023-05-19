<?php

namespace App\DTO\Api\User;

use JMS\Serializer\Annotation\SerializedName;

class UserLoginDTO
{
    #[SerializedName('email')]
    public string $email;

    #[SerializedName('password')]
    public string $password;
}