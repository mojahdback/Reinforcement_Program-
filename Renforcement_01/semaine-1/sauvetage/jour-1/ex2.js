//  EXERCICE 2 - Analyse d'un catalogue produits
//  *
//  * Contexte :
//  * Un magasin vous confie son catalogue sous forme de tableau d'objets.
//  * Vous devez produire plusieurs rapports pour le responsable des stocks.

const produits = [
  { id: 1, nom: 'Laptop Pro',      prix: 8500, stock: 12, categorie: 'Informatique' },
  { id: 2, nom: 'Souris sans fil', prix: 150,  stock: 3,  categorie: 'Informatique' },
  { id: 3, nom: 'Clavier mecanique',prix: 420, stock: 8,  categorie: 'Informatique' },
  { id: 4, nom: 'Bureau debout',   prix: 2200, stock: 5,  categorie: 'Mobilier'     },
  { id: 5, nom: 'Chaise ergonomique',prix:1800,stock: 2,  categorie: 'Mobilier'     },
  { id: 6, nom: 'Lampe LED',       prix: 180,  stock: 20, categorie: 'Mobilier'     },
  { id: 7, nom: 'Tapis de souris', prix: 80,   stock: 0,  categorie: 'Accessoires'  },
  { id: 8, nom: 'Support laptop',  prix: 350,  stock: 7,  categorie: 'Accessoires'  },
  { id: 9, nom: 'Webcam HD',       prix: 550,  stock: 4,  categorie: 'Informatique' },
];
// ex1 :  Retourner les produits dont le stock <= 5. Trier par stock croissant.

function produitsEnRuptureOuCritique(produits) {
    return produits
      .filter(p => p.stock <= 5)
      .sort((a,b) => a.stock - b.stock)

}

// ex2 :  Retourner un objet { categorie: valeurTotaleStock } ou
//   valeurTotaleStock = sum(stock * prix) pour cette categorie.
 
function valeurTotaleParCategorie(produits) {
     return produits.reduce((resultat, produit) => {
        const categorie = produit.categorie;
        const valeur = produit.stock * produit.prix ;

        if(!resultat[categorie]){
            resultat[categorie] = 0;
        }

        resultat[categorie] += valeur;

        return resultat ;
     },{});
}

// ex3 :   Retourner un objet { categorie: produitLePlusCher } (l'objet produit complet).
function produitLePlusCherParCategorie(produits) {
  
    return produits.reduce((max, prd) => {
        const categorie = prd.categorie;
        if(!max[categorie]){
            max[categorie] = prd;
        }

        else if(max[categorie].prix < prd.prix){
            max[categorie] = prd ;
        }
        
        return max;

    },{});
}
 

// ex4 :   Retourner un nouveau tableau avec le prix reduit pour la categorie donnee.
//  *    Arrondir a 2 decimales. Ne pas muter le tableau original.
function appliquerRemise(produits, categorie, pourcentage) {

    return produits.map(prd => {

        if(prd.categorie === categorie){
            let newPrix = prd.prix - (prd.prix * pourcentage / 100);

            return {
                ...prd,
                prix: Number(newPrix.toFixed(2))
            };
        }

        return prd;
    });


}

console.log(produitsEnRuptureOuCritique(produits));
console.log(valeurTotaleParCategorie(produits));
console.log(produitLePlusCherParCategorie(produits));
console.log(appliquerRemise(produits, 'Informatique', 10));