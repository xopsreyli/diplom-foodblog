<?php

namespace App\DTO\Api\User;

use JMS\Serializer\Annotation\SerializedName;

class CodeDTO
{
    #[SerializedName('code')]
    public int $code;
}