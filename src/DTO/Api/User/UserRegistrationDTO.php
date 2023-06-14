<?php

namespace App\DTO\Api\User;

use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

class UserRegistrationDTO
{
    #[
        SerializedName('email'),
        Assert\Email,
        Assert\NotBlank
    ]
    public string $email;

    #[
        SerializedName('nickname'),
        Assert\NotBlank,
        Assert\Length(
            min: 1,
            max: 30
        )
    ]
    public string $nickname;

    #[
        SerializedName('password'),
        Assert\NotBlank,
        Assert\Length(
            min: 8
        )
    ]
    public string $password;
}