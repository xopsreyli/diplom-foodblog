<?php

namespace App\Service\Minio;

use App\DTO\Minio\ImageDTO;
use Aws\S3\S3Client;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class MinioService
{
    public function __construct(
        private S3Client $s3Client
    )
    {
    }

    public function createBucket(string $bucketName): void
    {
        if (!$this->s3Client->doesBucketExist($bucketName)) {
            $this->s3Client->createBucket([
                'Bucket' => $bucketName
            ]);
        }
    }

    public function uploadFile(ImageDTO $imageDTO): void
    {
        $this->createBucket($imageDTO->bucketName);

        $this->s3Client->putObject([
            'Bucket' => $imageDTO->bucketName,
            'Key' => $imageDTO->key,
            'ACL' => 'public-read',
            'SourceFile' => $imageDTO->pathname,
            'ContentType' => $imageDTO->mimeType,
        ]);
    }
}