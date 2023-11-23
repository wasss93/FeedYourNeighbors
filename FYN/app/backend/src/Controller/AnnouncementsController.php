<?php

namespace App\Controller;

use App\Exception\AnnouncementNotFoundException;
use App\Exception\AnnouncementServiceException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\AnnouncementsService;
use Symfony\Component\HttpFoundation\JsonResponse;



class AnnouncementsController extends AbstractController
{

    #[Route('api/announcement/createAnnouncement', name: 'announcement_creation', methods: ['POST'])]
    public function createAnnouncement(AnnouncementsService $announcementsService, Request $request): JsonResponse
    {
        // Récupérez les données JSON de la requête
        $data = json_decode($request->getContent(), true);

        // Appel au service pour créer une annonce
        try {
            $result = $announcementsService->createAnnouncement($data);

            if ($result !== null) {
                throw new AnnouncementServiceException('Erreur lors de la création de l\'annonce');
            }

            // Répondez avec un message de succès
            return new JsonResponse(['message' => 'L\'annonce a été créée avec succès'], 201);
        } catch (AnnouncementServiceException $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/announcement/getAnnouncement/{id}', name: 'announcement_retreview', methods: ['GET'])]
    #[Route('/api/announcement/getAnnouncement/{id}', name: 'announcement_retreview', methods: ['GET'])]
    public function getAnnouncement(int $id, AnnouncementsService $announcementService, Request $request): JsonResponse
    {
        try {
            $announcement = $announcementService->getAnnouncement($id);
            if ($announcement === null) {
                throw new AnnouncementNotFoundException($id);
            }

            $announcementData = [
                'id' => $announcement->getId(),
                'owner_id' => $announcement->getOwner()->getId(),
                'is_attributed_to_id' => $announcement->getIsAttributedTo()->getId(),
                'complement' => $announcement->getComplement(),
                'description' => $announcement->getDescription(),
                'title' => $announcement->getTitle(),
                'categorie' => $announcement->getCategorie(),
                'date' => $announcement->getDate()->format('Y-m-d H:i:s'),
                'limitDate' => $announcement->getLimitDate()->format('Y-m-d H:i:s'),
                'status' => $announcement->isStatus(),
                'departement' => $announcement->getDepartement(),
                'numero_rue' => $announcement->getNumeroRue(),
                'rue' => $announcement->getRue(),
                'ville' => $announcement->getVille(),
                'code_postal' => $announcement->getCodePostal(),
                'allergenes' => $announcement->isAllergenes(),
                'poids' => $announcement->getPoids(),
            ];
            return $this->json($announcementData, 200);
        } catch (AnnouncementNotFoundException $e) {
            return $this->json(['error' => $e->getMessage()], 404);
        } catch (AnnouncementServiceException $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }


    #[Route('/api/announcement/bookAnnouncement/{id}', name: 'announcement_status_update', methods: ['POST'])]
    public function bookAnnouncement(int $id, AnnouncementsService $announcementService, Request $request): JsonResponse
    {
        try {
            $announcement = $announcementService->getAnnouncement($id);
            if ($announcement === null) {
                throw new AnnouncementNotFoundException($id);
            }

            $result = $announcementService->bookAnnouncement($id);

            if ($result !== null) {
                throw new AnnouncementServiceException('Erreur lors de la mise à jour du statut de l\'annonce');
            }

            return new JsonResponse(['message' => 'L\'annonce a été mise à jour avec succès'], 200);
        } catch (AnnouncementNotFoundException $e) {
            return $this->json(['error' => $e->getMessage()], 404);
        } catch (AnnouncementServiceException $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/announcement/deleteAnnouncement/{id}', name: 'announcement_delete', methods: ['DELETE'])]
    public function deleteAnnouncement($id, AnnouncementsService $announcementService, Request $request): JsonResponse
    {
        try {
            $announcement = $announcementService->getAnnouncement($id);
            if ($announcement === null) {
                throw new AnnouncementNotFoundException($id);
            }

            $result = $announcementService->deleteAnnouncement($id);
            if ($result !== null) {
                throw new AnnouncementServiceException('Erreur lors de la suppression de l\'annonce');
            }

            return new JsonResponse(['message' => 'L\'annonce a été supprimée avec succès'], 200);
        } catch (AnnouncementNotFoundException $e) {
            return $this->json(['error' => $e->getMessage()], 404);
        } catch (AnnouncementServiceException $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/announcement/getBookedAnnouncements', name: 'get_booked_announcements', methods: ['POST'])]

    public function getBookedAnnouncements(AnnouncementsService $announcementService, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $attributedToId = $data['attributed_to'];

        try {
            $announcements = $announcementService->getBookedAnnouncements($attributedToId);
            if (empty($announcements)) {
                throw new AnnouncementNotFoundException($attributedToId);
            }
            $announcementData = [];

            foreach ($announcements as $announcement) {
                $announcementData[] = [
                    'id' => $announcement->getId(),
                    'owner_id' => $announcement->getOwner()->getId(),
                    'is_attributed_to_id' => $announcement->getIsAttributedTo()->getId(),
                    'complement' => $announcement->getComplement(),
                    'description' => $announcement->getDescription(),
                    'title' => $announcement->getTitle(),
                    'categorie' => $announcement->getCategorie(),
                    'date' => $announcement->getDate()->format('Y-m-d H:i:s'),
                    'limitDate' => $announcement->getLimitDate()->format('Y-m-d H:i:s'),
                    'status' => $announcement->isStatus(),
                    'departement' => $announcement->getDepartement(),
                    'numero_rue' => $announcement->getNumeroRue(),
                    'rue' => $announcement->getRue(),
                    'ville' => $announcement->getVille(),
                    'code_postal' => $announcement->getCodePostal(),
                    'allergenes' => $announcement->isAllergenes(),
                    'poids' => $announcement->getPoids(),
                ];
            }

            return $this->json($announcementData[0], 200);
        } catch (AnnouncementNotFoundException $exception) {
            return $this->json(['error' => $exception->getMessage()], 404);
        }

    }


    #[Route('/api/announcement/getAnnouncementsOwner', name: 'get_announcement_by_owner', methods: ['POST'])]
    public function getAnnouncementOwner(announcementsService $announcementService, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $ownerId = $data['owner_id'];

        try {
            $announcements = $announcementService->getAnnouncementsOwner($ownerId);

            if (empty($announcements)) {
                throw new AnnouncementNotFoundException($ownerId);
            }

            $announcementData = [];

            foreach ($announcements as $announcement) {
                $announcementData[] = [
                    'id' => $announcement->getId(),
                    'owner_id' => $announcement->getOwner()->getId(),
                    'is_attributed_to_id' => $announcement->getIsAttributedTo()->getId(),
                    'complement' => $announcement->getComplement(),
                    'description' => $announcement->getDescription(),
                    'title' => $announcement->getTitle(),
                    'categorie' => $announcement->getCategorie(),
                    'date' => $announcement->getDate()->format('Y-m-d H:i:s'),
                    'limitDate' => $announcement->getLimitDate()->format('Y-m-d H:i:s'),
                    'status' => $announcement->isStatus(),
                    'departement' => $announcement->getDepartement(),
                    'numero_rue' => $announcement->getNumeroRue(),
                    'rue' => $announcement->getRue(),
                    'ville' => $announcement->getVille(),
                    'code_postal' => $announcement->getCodePostal(),
                    'allergenes' => $announcement->isAllergenes(),
                    'poids' => $announcement->getPoids(),
                ];
            }

            return $this->json($announcementData, 200);
        } catch (AnnouncementNotFoundException $exception) {
            return $this->json(['error' => $exception->getMessage()], 404);
        } catch (\Exception $exception) {
            return $this->json(['error' => 'Une erreur s\'est produite.'], 500);
        }
    }

}
