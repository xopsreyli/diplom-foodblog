<?php

namespace App\Controller\Api\Article;

use App\DTO\Api\Article\ArticleCreationDTO;
use App\DTO\Api\Article\ArticleCreationResponseDTO;
use App\DTO\Api\Article\ArticleResponseDTO;
use App\DTO\Api\Article\ArticlesResponseDTO;
use App\DTO\Api\Article\ArticleUpdateDTO;
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
                ref: new Model(
                    type: ArticleCreationDTO::class
                )
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Article created successfully! Returns ArticleCreationResponseDTO(id)',
            content: new OA\JsonContent(
                ref: new Model(
                    type: ArticleCreationResponseDTO::class
                )
            ),
        ),
    ]
    public function createArticle(Request $request): JsonResponse
    {
        $articleCreationDTO = $this->serializer->deserialize($request->request->get('jsonData'), ArticleCreationDTO::class, 'json');
        $articleCreationDTO->image = $request->files->get('avatar');

        $response = $this->service->createArticle($articleCreationDTO, $this->getUser());

        return new JsonResponse($this->serializer->serialize($response, 'json'), json: true);
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
        OA\Response(
            response: Response::HTTP_NOT_FOUND,
            description: 'Article was not found',
        ),
        ]
    public function getArticle(Request $request): JsonResponse
    {
        $id = $request->query->get('id');

        $response = $this->service->getArticle($id);

        if (null === $response) {
            return new JsonResponse(status: 404);
        }

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

    /**
     * Get all articles
    */
    #[
        Rest\Get('/all'),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Returns an array af all articles'
        ),
    ]
    public function getAllArticles(): JsonResponse
    {
        return new JsonResponse($this->serializer->serialize($this->service->getAllArticles(), 'json'), json: true);
    }

    /**
     * Update article
    */
    #[
        Rest\Post('/update'),
        OA\RequestBody(
            description: 'ArticleUpdateDTO(id, img, title, content, category)',
            required: true,
            content: new OA\JsonContent(
                ref: new Model(
                    type: ArticleUpdateDTO::class
                )
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Article was updated successfully'
        ),
    ]
    public function update(Request $request): JsonResponse
    {
        $articleRequestDTO = $this->serializer->deserialize($request->request->get('jsonData'), ArticleUpdateDTO::class, 'json');
        if ($request->files->count()) {
            $articleRequestDTO->image = $request->files->get('img');
        }

        $this->service->update($articleRequestDTO, $this->getUser());

        return new JsonResponse();
    }

    /**
     * Returns last 10 created articles
    */
    #[
        Rest\Get('/latest'),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Latest 10 articles',
            content: new OA\JsonContent(
                ref: new Model(
                    type: ArticlesResponseDTO::class
                )
            ),
        ),
    ]
    public function latest10Articles(): JsonResponse
    {
        return new JsonResponse($this->serializer->serialize($this->service->latest10Articles(), 'json'), json: true);
    }

    /**
     * Returns most liked 10 articles
     */
    #[
        Rest\Get('/popular'),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Most popular articles',
            content: new OA\JsonContent(
                ref: new Model(
                    type: ArticlesResponseDTO::class
                )
            ),
        ),
    ]
    public function popularArticles(): JsonResponse
    {
        return new JsonResponse($this->serializer->serialize($this->service->popularArticles(), 'json'), json: true);
    }
}
