<?php 

class Produit {
    private int $id;
    private string $nom;
    private string $description;
    private float $prix;
    private int $stock = 10;
    private string $categorie;
    private bool $actif;

    public function __construct(string $nom , string $description , float $prix , int $stock , string $categorie , bool $actif){
        $this->id= rand(1,1000);
        $this->nom = $nom ;
        if($prix <= 0 || $stock < 0){
            throw new InvalidArgumentException('invalide');
        }
        $this-> prix = $prix;
        $this->stock = $stock;
        $this->description = $description;
        $this->actif = $actif;
        $this->categorie = $categorie;
    }

    public function approvisionner(int $quantite): void{
         if($quantite <= 0){

                throw new InvalidArgumentException('Quantite invalide');

         }

         $this->stock += $quantite;
    }

    public function getPrix():float
    {
        return $this->prix;
    }

     public function getStock():int
    {
        return $this->stock;
    }


    public function vendre(int $quantite){
        if($quantite > $this->stock){
            throw new RuntimeException("Stock insuffisant");
        }

        $this->stock -= $quantite;

        return ($this->prix * $quantite);
    }

    public function appliquerRemise(float $pourcentage): void
    {
        if($pourcentage < 0 || $pourcentage > 50){
            throw new InvalidArgumentException("choose between 1 to 50");
        }

        $this->prix -= ($this->prix * $pourcentage / 100);

    }

    public function estDisponible(): bool
    {
       return $this->actif && $this->stock > 0;

    }

    public function toArray(): array{
        return [
            "id" => $this-> id,
            "nom" => $this->nom,
            "description" => $this->description,
            "prix" => $this->prix,
            "stock" => $this->stock,
            "categorie" => $this->categorie,
            "actif" => $this->actif,

        ];

    }






}


 $p = new Produit("Laptop" , "very nice", 1000 , 10 , "Informatique" , true);

$p->approvisionner(5);

print_r($p);

$montant = $p->vendre(6);

echo "Montant: " . $montant . PHP_EOL;
echo "Stock restant: " . $p->getStock() . PHP_EOL;

$p->appliquerRemise(10);
echo $p->getPrix();

print_r($p->toArray());

