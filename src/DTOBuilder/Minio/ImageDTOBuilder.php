<?php

namespace App\DTOBuilder\Minio;

use App\DTO\Minio\ImageDTO;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ImageDTOBuilder
{
    public static function build(UploadedFile $uploadedFile, string $bucketName): ImageDTO
    {
        $imageDTO = new ImageDTO();

        $newImageName = uniqid() . '.' . $uploadedFile->guessExtension();
        $imageDTO->key = $newImageName;
        $imageDTO->pathname = $uploadedFile->getPathname();
        $imageDTO->mimeType = $uploadedFile->getMimeType();
        $imageDTO->bucketName = $bucketName;

        return $imageDTO;
    }
}