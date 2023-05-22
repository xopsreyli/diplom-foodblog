<?php

namespace App\DTO\Api\User;

use JMS\Serializer\Annotation\SerializedName;

class UserRegistrationDTO
{
    #[SerializedName('email')]
    public string $email;

    #[SerializedName('nickname')]
    public string $nickname;

    #[SerializedName('password')]
    public string $password;
}