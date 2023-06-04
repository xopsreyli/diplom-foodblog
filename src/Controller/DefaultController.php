<?php

namespace App\Controller;

use App\Service\Minio\MinioService;
use Aws\S3\S3Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\DependencyInjection\Compiler\RegisterTokenUsageTrackingPass;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
     #[Route('/{reactRouting}', defaults: ['reactRouting' => null])]
    public function reactRouting(): Response
    {
        return $this->render('base.html.twig');
    }

    #[Route('/{reactRouting}/{parameter}', defaults: ['reactRouting' => null, 'parameter' => null])]
    public function reactRoutingWithParameter(): Response
    {
        return $this->render('base.html.twig');
    }

    #[Route('/{reactRouting}/{parameter}/{parameter2}', defaults: ['reactRouting' => null, 'parameter' => null, 'parameter2' => null])]
    public function reactRoutingWithTwoParameter(): Response
    {
        return $this->render('base.html.twig');
    }
}
