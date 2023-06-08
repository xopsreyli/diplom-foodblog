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
                'Bucket' => $bucketName,
                'ACL' => 'public-read',
            ]);

            $policy = '{
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Sid": "PublicRead",
                        "Effect": "Allow",
                        "Principal": "*",
                        "Action": [
                            "s3:GetObject"
                        ],
                        "Resource": "arn:aws:s3:::' . $bucketName . '/*"
                    }
                ]
            }';

            $this->s3Client->putBucketPolicy([
                'Bucket' => $bucketName,
                'Policy' => $policy,
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

    public function deleteFile(string $key, string $bucketName): void
    {
        $this->s3Client->deleteObject([
            'Bucket' => $bucketName,
            'Key' => $key,
        ]);
    }

    public function getObjectUrl(string $bucket, string $key): string
    {
        return $this->s3Client->getObjectUrl($bucket, $key);
    }
}