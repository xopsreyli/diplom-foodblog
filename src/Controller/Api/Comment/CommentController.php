<?php

namespace App\Controller\Api\Comment;

use App\DTO\Api\Comment\CommentCreationDTO;
use App\Service\Comment\CommentService;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use OpenApi\Attributes as OA;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

#[
    Rest\Route('api/comment'),
    OA\Tag('Comment'),
]
class CommentController extends AbstractFOSRestController
{
    private SerializerInterface $serializer;

    public function __construct(
        private CommentService $service
    )
    {
        $this->serializer = SerializerBuilder::create()->build();
    }

    /**
     * Create comment
    */
    #[
        Rest\Post(''),
        OA\RequestBody(
            description: 'CommentCreationDTO(text, article_id)',
            required: true,
            content: new OA\JsonContent(
                ref: new Model(type: CommentCreationDTO::class)
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Comment for the article was successfully created'
        ),
    ]
    public function createComment(Request $request): JsonResponse
    {
        $commentCreationDTO = $this->serializer->deserialize($request->getContent(), CommentCreationDTO::class, 'json');

        $this->service->createComment($commentCreationDTO, $this->getUser());

        return new JsonResponse();
    }
}
