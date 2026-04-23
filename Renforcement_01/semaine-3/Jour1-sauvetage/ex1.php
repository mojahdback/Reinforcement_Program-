<?php

class Utilisateur
{
    private static int $nextId = 1;
    private int $id;
    private string $nom;
    private string $prenom;
    private string $email;
    private string $motDePasse;
    private bool $actif;
    private string $dateCreation;

      public function __construct(string $nom, string $prenom, string $email, string $motDePasse)
    {
       $this->id = self::$nextId++;
        $this->nom = $nom;
        $this->prenom = $prenom;

        if(!FILTER_VAR($email , FILTER_VALIDATE_EMAIL)){
            throw new InvalidArgumentException("email valide");
        }
        $this->email = $email ;
        $this->motDePasse = password_hash($motDePasse , PASSWORD_DEFAULT);
        $this->actif = true ;
        $this->dateCreation = date('Y-m-d H:i:s');
        

    }

    public function getNomComplet(): string 
    {
        return $this->nom. ' ' . $this->prenom;
    }

    public function verifierMotDePasse(string $motDePasse): bool
    {
       return password_verify($motDePasse , $this->motDePasse);
    }

      public function changerEmail(string $nouvelEmail): void
    {
        if(!FILTER_VAR($nouvelEmail , FILTER_VALIDATE_EMAIL)){
            throw new InvalidArgumentException("valide email");
        }

        $this->email = $nouvelEmail;
    }

      public function desactiver(): void
    {
        $this->actif = false;
    }

     public function toArray(): array
    {
        return [

            'id' => $this->id,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'actif' => $this-> actif,
            'dateCreation' => $this-> dateCreation
        ];
    }

     public function getId(): int { return $this->id; }
     public function getEmail(): string { return $this->email; }
     public function isActif(): bool { return $this->actif; }


}

try {
    $u = new Utilisateur('Alami', 'Hassan', 'h.alami@email.ma', 'MonMdp123!');
    echo $u->getNomComplet() . PHP_EOL; // Hassan Alami
    echo ($u->verifierMotDePasse('MonMdp123!') ? 'Mot de passe correct' : 'Incorrect') . PHP_EOL;
    print_r($u->toArray());

    $u->changerEmail('nouveau@email.ma');
    echo 'Nouvel email : ' . $u->getEmail() . PHP_EOL;

    // Test email invalide
    $u2 = new Utilisateur('Test', 'User', 'email-invalide', 'mdp');
} catch (InvalidArgumentException $e) {
    echo 'Erreur attendue : ' . $e->getMessage() . PHP_EOL;
}