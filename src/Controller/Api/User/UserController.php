<?php

namespace App\Controller\Api\User;

use App\DTO\Api\User\UserLoginDTO;
use App\DTO\Api\User\UserProfileResponseDTO;
use App\DTO\Api\User\UserRegistrationDTO;
use App\Entity\User\User;
use App\Service\User\UserService;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializerInterface;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;

#[
    Rest\Route('/api/user'),
    OA\Tag('User'),
]
class UserController extends AbstractFOSRestController
{
    private SerializerInterface $serializer;

    public function __construct(
        private UserService $service
    )
    {
        $this->serializer = SerializerBuilder::create()->build();
    }

    /**
     * User registration
    */
    #[
        Rest\Post('/registration'),
        OA\RequestBody(
            description: 'UserRegistrationDTO(email, nickname, password)',
            required: true,
            content: new OA\JsonContent(
                ref: new Model(type: UserRegistrationDTO::class)
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Registration completed successfully!',
        ),
    ]
    public function registration(Request $request): JsonResponse
    {
        $userRegistrationDTO = $this->serializer->deserialize($request->getContent(), UserRegistrationDTO::class, 'json');

        $this->service->registration($userRegistrationDTO);

        return new JsonResponse();
    }

    /**
     * Log in
    */
    #[
        Rest\Post('/login'),
        OA\RequestBody(
            description: 'UserLoginDTO(email, password)',
            required: true,
            content: new OA\JsonContent(
                ref: new Model(type: UserLoginDTO::class)
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'User loged in successfully!',
        )
    ]
    public function login(): JsonResponse
    {
        return new JsonResponse();
    }

    /**
     * Log out
    */
    #[
        Rest\Get('/logout'),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'User loged out successfully!',
        )
    ]
    public function logout(): JsonResponse
    {
        return new JsonResponse();
    }

    #[
        Rest\Get('/profile'),
        OA\Parameter(
            name: 'id',
            in: 'query',
            description: "User's id",
            schema: new OA\Schema(type: 'integer'),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Returns user profile data(id, nickname, articles)',
            content: new OA\JsonContent(
                ref: new Model(
                    type: UserProfileResponseDTO::class
                )
            ),
        ),
    ]
    public function profile(Request $request): JsonResponse
    {
        $id = $request->query->get('id');

        $response = $this->service->profile($id);

        return new JsonResponse($this->serializer->serialize($response, 'json'), json: true);
    }
}