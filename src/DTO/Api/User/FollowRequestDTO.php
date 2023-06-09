<?php

namespace App\DTO\Api\User;

use JMS\Serializer\Annotation\SerializedName;

class FollowRequestDTO
{
    #[SerializedName('id')]
    public int $id;
}
