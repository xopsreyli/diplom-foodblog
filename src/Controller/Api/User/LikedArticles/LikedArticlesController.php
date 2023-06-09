<?php

namespace App\Controller\Api\User\LikedArticles;

use App\DTO\Api\User\LikedArticle\LikedArticleRequestDTO;
use App\Service\User\LikedArticle\LikedArticleService;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializerInterface;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

#[
    Rest\Route('/api/user/article'),
    OA\Tag('User articles')
]
class LikedArticlesController extends AbstractFOSRestController
{
    private SerializerInterface $serializer;

    public function __construct(
        private LikedArticleService $service
    )
    {
        $this->serializer = SerializerBuilder::create()->build();
    }

    /**
     * Add liked article if it doesn't exist, and change status if exist
    */
    #[
        Rest\Post('/like'),
        OA\RequestBody(
            description: 'LikedArticleDTO(id)',
            required: true,
            content: new OA\JsonContent(
                ref: new Model(type: LikedArticleRequestDTO::class)
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Added liked article for user'
        ),
        ]
    public function like(Request $request): JsonResponse
    {
        $likedArticleRequestDTO = $this->serializer->deserialize($request->getContent(), LikedArticleRequestDTO::class, 'json');

        $this->service->like($likedArticleRequestDTO, $this->getUser());

        return new JsonResponse();
    }

    /**
     * Check if the article is liked by user
    */
    #[
        Rest\Get('/liked'),
        OA\Parameter(
            name: 'id',
            description: "Article's id",
            in: 'query',
            schema: new OA\Schema(
                type: 'integer',
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Boolean value'
        ),
    ]
    public function isLiked(Request $request): JsonResponse
    {
        $id = $request->query->get('id');

        return new JsonResponse($this->serializer->serialize($this->service->isLiked($id, $this->getUser()), 'json'), json: true);
    }
}
