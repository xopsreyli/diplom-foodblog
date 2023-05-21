<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
}