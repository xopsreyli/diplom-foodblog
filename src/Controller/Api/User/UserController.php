<?php

namespace App\Controller\Api\User;

use App\DTO\Api\User\CodeDTO;
use App\DTO\Api\User\FollowersDTO;
use App\DTO\Api\User\FollowRequestDTO;
use App\DTO\Api\User\IsFollowedDTO;
use App\DTO\Api\User\PasswordDTO;
use App\DTO\Api\User\UserDTO;
use App\DTO\Api\User\UserLoginDTO;
use App\DTO\Api\User\UserProfileResponseDTO;
use App\DTO\Api\User\UserRegistrationDTO;
use App\DTO\Api\User\UserUpdateDTO;
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

    /**
     * Returns info about current user
    */
    #[
        Rest\Get(''),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Returns info about loged user(UserDTO)',
            content: new OA\JsonContent(
                ref: new Model(
                    type: UserDTO::class
                )
            ),
        ),
        ]
    public function logedUser(): JsonResponse
    {
        return new JsonResponse($this->serializer->serialize($this->service->logedUser($this->getUser()), 'json'), json: true);
    }

    /**
     * Returns info about user for profile page
    */
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
            description: 'Returns user profile data(userDTO, followers, follows, articles)',
            content: new OA\JsonContent(
                ref: new Model(
                    type: UserProfileResponseDTO::class
                )
            ),
        ),
        OA\Response(
            response: Response::HTTP_NOT_FOUND,
            description: 'User was not found',
        ),
    ]
    public function profile(Request $request): JsonResponse
    {
        $id = $request->query->get('id');

        $response = $this->service->profile($id);
        if (null === $response) {
            return new JsonResponse(status: 404);
        }

        return new JsonResponse($this->serializer->serialize($response, 'json'), json: true);
    }

    /**
     * Update user's avatar or nickname
    */
    #[
        Rest\Post('/update'),
        OA\RequestBody(
            description: 'UserUpdateDTO(nickname in json and image as a file)',
            required: true,
            content: new OA\JsonContent(
                ref: new Model(type: UserUpdateDTO::class)
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'User was updated'
        ),
    ]
    public function update(Request $request): JsonResponse
    {
        $userUpdateDTO = $this->serializer->deserialize($request->request->get('jsonData'), UserUpdateDTO::class, 'json');
        if ($request->files->count()) {
            $userUpdateDTO->image = $request->files->get('image');
        }

        $this->service->update($userUpdateDTO, $this->getUser());

        return new JsonResponse();
    }

    /**
     * Follow or unfollow user, depends on current status
    */
    #[
        Rest\Post('/follow'),
        OA\RequestBody(
            description: 'FollowRequestDTO(id)',
            required: true,
            content: new OA\JsonContent(
                ref: new Model(
                    type: FollowRequestDTO::class
                )
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'User followed or unfollowed'
        ),
    ]
    public function follow(Request $request): JsonResponse
    {
        $followRequestDTO = $this->serializer->deserialize($request->getContent(), FollowRequestDTO::class, 'json');

        $this->service->follow($followRequestDTO, $this->getUser());

        return new JsonResponse();
    }

    /**
     * returns info if user is followed or not
    */
    #[
        Rest\Post('/followed'),
        OA\RequestBody(
            description: 'FollowRequestDTO(id)',
            required: true,
            content: new OA\JsonContent(
                ref: new Model(
                    type: FollowRequestDTO::class
                )
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'true if followed and false if not',
            content: new OA\JsonContent(
                ref: new Model(
                    type: IsFollowedDTO::class
                )
            ),
        ),
    ]
    public function isFollowed(Request $request): JsonResponse
    {
        $followRequestDTO = $this->serializer->deserialize($request->getContent(), FollowRequestDTO::class, 'json');

        $response = $this->service->isFollowed($followRequestDTO, $this->getUser());

        return new JsonResponse($this->serializer->serialize($response, 'json'), json: true);
    }

    /**
     * Returns all followers of the user
    */
    #[
        Rest\Get('/followers'),
        OA\Parameter(
            name: 'id',
            in: 'query',
            description: 'Id of the user whos followers need to return',
            schema: new OA\Schema(
                type: 'integer'
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Followers of the user',
            content: new OA\JsonContent(
                ref: new Model(
                    type: FollowersDTO::class
                )
            ),
        ),
    ]
    public function followers(Request $request): JsonResponse
    {
        $id = $request->query->get('id');

        $response = $this->service->followers($id);

        return new JsonResponse($this->serializer->serialize($response, 'json'), json: true);
    }

    /**
     * Returns all follows of the user
     */
    #[
        Rest\Get('/follows'),
        OA\Parameter(
            name: 'id',
            in: 'query',
            description: 'Id of the user whos follows need to return',
            schema: new OA\Schema(
                type: 'integer'
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Follows of the user',
            content: new OA\JsonContent(
                ref: new Model(
                    type: FollowersDTO::class
                )
            ),
        ),
    ]
    public function follows(Request $request): JsonResponse
    {
        $id = $request->query->get('id');

        $response = $this->service->follows($id);

        return new JsonResponse($this->serializer->serialize($response, 'json'), json: true);
    }

    /**
     * Check if password is right and send code
    */
    #[
        Rest\Post('/password/reset'),
        OA\RequestBody(
            description: 'Password of the user',
            required: true,
            content: new OA\JsonContent(
                ref: new Model(
                    type: PasswordDTO::class
                )
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Code to restore password was sent'
        ),
        OA\Response(
            response: Response::HTTP_BAD_REQUEST,
            description: 'Code to restore password was sent'
        ),
    ]
    public function getPasswordToResetAndSendCode(Request $request): JsonResponse
    {
        $passwordDTO = $this->serializer->deserialize($request->getContent(), PasswordDTO::class, 'json');

        $result = $this->service->getPasswordToResetAndSendCode($passwordDTO, $this->getUser());

        if ($result) {
            return new JsonResponse();
        }

        return new JsonResponse(status: 400);
    }

    /**
     * Check if the code to restore password is right
     */
    #[
        Rest\Post('/password/reset/code'),
        OA\RequestBody(
            description: 'Code to restore password',
            content: new OA\JsonContent(
                ref: new Model(
                    type: CodeDTO::class
                )
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Code to reset password is right'
        ),
        OA\Response(
            response: Response::HTTP_BAD_REQUEST,
            description: 'Code to restore password is wrong'
        ),
    ]
    public function checkCodeToResetPassword(Request $request): JsonResponse
    {
        $codeDTO = $this->serializer->deserialize($request->getContent(), CodeDTO::class, 'json');

        $result = $this->service->checkCodeToResetPassword($codeDTO, $this->getUser());

        if ($result) {
            return new JsonResponse();
        }

        return new JsonResponse(status: 400);
    }

    /**
     * Set new password to the user
    */
    #[
        Rest\Post('/password/reset/new'),
        OA\RequestBody(
            description: 'New password',
            required: true,
            content: new OA\JsonContent(
                ref: new Model(
                    type: PasswordDTO::class
                )
            ),
        ),
        OA\Response(
            response: Response::HTTP_OK,
            description: 'Password was changed successfully'
        ),
    ]
    public function setNewPassword(Request $request): JsonResponse
    {
        $passwordDTO = $this->serializer->deserialize($request->getContent(), PasswordDTO::class, 'json');

        $this->service->resetPassword($passwordDTO, $this->getUser());

        return new JsonResponse();
    }
}