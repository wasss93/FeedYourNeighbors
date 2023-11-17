<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\Announcements;
use DateTimeImmutable;
use DateInterval;
use Doctrine\Persistence\ManagerRegistry as PersistenceManagerRegistry;


class AnnouncementsService
{
    private $doctrine;
    public function __construct(PersistenceManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    public function createAnnouncement($data)
    {
        $currentDate = DateTimeImmutable::createFromFormat('Y-m-d', date('Y-m-d'));
        $dateInOneMonth = DateTimeImmutable::createFromFormat('Y-m-d', date('Y-m-d'))->add(new DateInterval('P1M'));
        $entityManager = $this->doctrine->getManager();
        $announcements = new Announcements();
        $user = $entityManager->find(User::class, $data['owner_id']);
        $attributedToUser = $entityManager->find(User::class, $data['attributed_to_id']);
        $announcements->setOwner($user);
        $announcements->setIsAttributedTo($attributedToUser);
        $announcements->setComplement($data['complement']);
        $announcements->setDescription($data['description']);
        if (array_key_exists('date', $data)) {
            $announcements->setDate($data['date']);
        } else {
            $announcements->setDate($currentDate);
        }
        if (array_key_exists('limit_date', $data)) {
            $announcements->setLimitDate($data['limit_date']);
        } else {
            $announcements->setLimitDate($dateInOneMonth);
        }
        $announcements->setTitle($data['title']);
        $announcements->setCategorie($data['categorie']);
        $announcements->setDepartement($data['departement']);
        $announcements->setNumeroRue($data['numero_rue']);
        $announcements->setStatus($data['status']);
        $announcements->setRue($data['rue']);
        $announcements->setCodePostal($data['code_postal']);
        $announcements->setVille($data['ville']);
        $entityManager->persist($announcements);

        try {
            $entityManager->flush();
            return null;
        } catch (\Exception $e) {
            return ['message' => 'Il y\'a eu une erreur lors de la création de l\'annonce.'];
        }

    }

    public function getAnnouncement(int $id)
    {
        $manager = $this->doctrine->getManager();
        $announcement = $manager->getRepository(Announcements::class)->findOneBy(['id' => $id]);
        if (!$announcement) {
            return null;
        }
        try {
            return $announcement;
        } catch (\Exception $e) {
            return ['message' => 'Il y\'a eu une erreur lors de la récupération de l\'annonce.'];
        }

    }

    public function updateAnnouncementStatus(int $id)
    {
        $entityManager = $this->doctrine->getManager();
        $announcement = $entityManager->getRepository(Announcements::class)->find($id);

        if (!$announcement) {
            return 'Aucune annonce trouvée pour l\'ID ' . $id;
        }
        try {
            $announcement->setStatus(true);
            $entityManager->flush();
        } catch (\Exception $e) {
            return ['message' => 'Il y\'a eu une erreur lors de la mise à jour de l\'annonce.'];
        }

        return null;
    }

    public function deleteAnnouncement(int $id)
    {
        $entityManager = $this->doctrine->getManager();
        $announcement = $entityManager->getRepository(Announcements::class)->find($id);
        if (!$announcement) {
            return 'Aucune annonce trouvée pour l\'ID ' . $id;
        }
        $entityManager->remove($announcement);
        $entityManager->flush();

        return null;
    }

    public function getAnnouncementsOwner(int $ownerId)
    {
        $manager = $this->doctrine->getManager();
        $announcements = $manager->getRepository(Announcements::class)->findBy(['owner' => $ownerId]);
        if (!$announcements) {
            return null;
        }
        return $announcements;
    }
}