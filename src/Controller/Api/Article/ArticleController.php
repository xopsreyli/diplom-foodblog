<?php

namespace App\Controller\Api\Article;

use App\DTO\Api\Article\ArticleCreationDTO;
use App\DTO\Api\Article\ArticleResponseDTO;
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
            description: 'ArticleCreationDTO(image, title, content, category_id)',
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
        $articleCreationDTO = $this->serializer->deserialize($request->request->get('jsonData'), ArticleCreationDTO::class, 'json');
        $articleCreationDTO->image = $request->files->get('avatar');

        $this->service->createArticle($articleCreationDTO, $this->getUser());

        return new JsonResponse();
    }

    /**
     * Get article by id
    */
    #[
        Rest\Get(''),
        OA\Parameter(
            name: 'id',
            in: 'query',
            description: "Article's id",
            schema: new OA\Schema(type: 'integer'),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'ArticleResponseDTO',
            content: new OA\JsonContent(
                ref: new Model(
                    type: ArticleResponseDTO::class
                )
            ),
        ),
        ]
    public function getArticle(Request $request): JsonResponse
    {
        $id = $request->query->get('id');

        $response = $this->service->getArticle($id);

        return new JsonResponse($this->serializer->serialize($response, 'json'), json: true);
    }

    /**
     * Delete article
    */
    #[
        Rest\Get('/delete'),
        OA\Parameter(
            name: 'id',
            description: 'Id of the article to delete',
            in: 'query',
            schema: new OA\Schema(
                type: 'integer'
            )
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Article was successfully deleted!'
        ),
    ]
    public function delete(Request $request): JsonResponse
    {
        $id = $request->query->get('id');

        $this->service->delete($id, $this->getUser());

        return new JsonResponse();
    }
}
