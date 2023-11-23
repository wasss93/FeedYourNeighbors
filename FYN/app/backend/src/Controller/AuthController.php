<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\RegisterService;
use App\Service\LoginService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

class AuthController extends AbstractController
{
    public function __construct(ManagerRegistry $doctrine) // Injectez le ManagerRegistry
    {
        $this->doctrine = $doctrine;
    }
    #[Route('api/registration', name: 'app_registration', methods: ['POST'])]
    public function registration(registerService $registrationService, Request $request): JsonResponse
    {
        // Récupérez les données JSON de la requête
        $data = json_decode($request->getContent(), true);
        try {
            $result = $registrationService->createUser($data);
        } catch (\Exception $e) {
            $this->addFlash('error', $e->getMessage());
        }

        if ($result !== null) {
            return new JsonResponse($result, 500); // Erreur
        }

        // Répondez avec un message de succès
        return new JsonResponse(['message' => 'Utilisateur enregistré avec succès.'], 201);
    }


    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request, LoginService $loginService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['email']) && isset($data['password'])) {
            $email = $data['email'];
            $password = $data['password'];

            $token = $loginService->login($email, $password);

            if ($token !== null) {
                // Connexion réussie, renvoie le jeton JWT
                return new JsonResponse(['token' => $token]);
            }
        }

        return new JsonResponse(['message' => 'Email ou mot de passe incorrect.'], 401);

    }
}
