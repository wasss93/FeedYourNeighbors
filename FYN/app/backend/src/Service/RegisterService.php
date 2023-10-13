<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry as PersistenceManagerRegistry;

class RegisterService{

    private $doctrine;

    public function __construct(PersistenceManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    public function createUser($data)
    {
        $entityManager = $this->doctrine->getManager();

        // Vérifiez si les données requises sont présentes
        if (!isset($data['email']) || !isset($data['password']) || !isset($data['username'])) {
            return ['message' => 'Tous les champs sont requis.'];
        }

        // Créez un nouvel utilisateur
        $user = new User();
        $user->setEmail($data['email']);
        $user->setUsername($data['username']);
        $user->setRoles(['ROLE_USER']);

        // Utilisez bcrypt pour hacher le mot de passe
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
        $user->setPassword($hashedPassword);

        // Enregistrez l'utilisateur dans la base de données
        $entityManager->persist($user);

        try {
            $entityManager->flush();
            return null; // Pas d'erreur, retourne null pour indiquer le succès
        } catch (\Exception $e) {
            // En cas d'erreur, retourne un message d'erreur
            return ['message' => 'Email ou mot de passe invalide.'];
        }
    }



}