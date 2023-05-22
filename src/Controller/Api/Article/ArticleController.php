<?php

namespace App\Controller\Api\Article;

use App\DTO\Api\Article\ArticleCreationDTO;
use App\Service\Article\ArticleService;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializerInterface;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

#[
    Rest\Route('/api/article'),
    OA\Tag('Article'),
]
class ArticleController extends AbstractFOSRestController
{
    private SerializerInterface $serializer;

    public function __construct(
        private ArticleService $service
    )
    {
        $this->serializer = SerializerBuilder::create()->build();
    }

    /**
     * Create new article
    */
    #[
        Rest\Post('/create'),
        OA\RequestBody(
            description: 'ArticleCreationDTO(title, content, category_id)',
            required: true,
            content: new OA\JsonContent(
                ref: new Model(type: ArticleCreationDTO::class)
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Article created successfully!',
        ),
    ]
    public function createArticle(Request $request): JsonResponse
    {
        $articleCreationDTO = $this->serializer->deserialize($request->getContent(), ArticleCreationDTO::class, 'json');

        $this->service->createArticle($articleCreationDTO, $this->getUser());

        return new JsonResponse();
    }
}
