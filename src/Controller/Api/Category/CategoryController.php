<?php

namespace App\Controller\Api\Category;

use App\Service\Category\CategoryService;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializerInterface;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

#[
    Rest\Route('/api/category'),
    OA\Tag('Category'),
    ]
class CategoryController extends AbstractFOSRestController
{
    private SerializerInterface $serializer;

    public function __construct(
        private CategoryService $service
    )
    {
        $this->serializer = SerializerBuilder::create()->build();
    }

    /**
     * Get all categories
    */
    #[
        Rest\Get(''),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Returns all categories'
        ),
    ]
    public function getAllCategories(): JsonResponse
    {
        //TODO: Возвращать не сущности напрямую, а придумать какой-то ResponseDTO
        return new JsonResponse($this->serializer->serialize($this->service->getAllCategories(), 'json'), json: true);
    }
}
