<?php

namespace App\DTO\Api\User;

use JMS\Serializer\Annotation\SerializedName;

class PasswordDTO
{
    #[SerializedName('password')]
    public string $password;
}