<?php
namespace App\Controller;

use App\Service\ChatService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ChatController extends AbstractController
{
    #[Route('/api/send-message', name: 'send_message', methods: ['POST'])]
    public function sendMessage(Request $request, ChatService $chatService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['to']) && isset($data['message'])) {
            $to = $data['to'];
            $message = $data['message'];
            $currentUser = $this->getUser();
            if (!$currentUser) {
                return new JsonResponse(['message' => 'Utilisateur non connecté.'], 403);
            }
            $chatService->sendMessage($currentUser->getId(), $to, $message);
            return new JsonResponse(['success' => true]);
        }

        return new JsonResponse(['message' => 'Données manquantes.'], 400);
    }

}