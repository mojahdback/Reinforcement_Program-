//  * EXERCICE 1 - Traitement d'un journal de commandes
//  *
//  * Contexte :
//  * Vous etes developpeur dans une startup logistique. Vous recevez chaque jour
//  * un tableau de commandes issues de l'API. Vous devez extraire des informations
//  * utiles pour le tableau de bord du responsable operations.

const commandes = [
  { id: 'CMD-001', client: 'Alami Hassan',    montant: 450,  statut: 'livree',     ville: 'Casablanca' },
  { id: 'CMD-002', client: 'Benali Sara',     montant: 1200, statut: 'en_attente', ville: 'Rabat'       },
  { id: 'CMD-003', client: 'Chraibi Omar',    montant: 320,  statut: 'en_cours',   ville: 'Marrakech'   },
  { id: 'CMD-004', client: 'Drissi Fatima',   montant: 875,  statut: 'en_attente', ville: 'Fes'         },
  { id: 'CMD-005', client: 'El Amrani Youssef',montant: 95,  statut: 'annulee',    ville: 'Casablanca'  },
  { id: 'CMD-006', client: 'Fassi Leila',     montant: 2100, statut: 'livree',     ville: 'Tanger'      },
  { id: 'CMD-007', client: 'Ghazali Mehdi',   montant: 560,  statut: 'en_attente', ville: 'Agadir'      },
  { id: 'CMD-008', client: 'Hamdaoui Nadia',  montant: 430,  statut: 'en_cours',   ville: 'Casablanca'  },
];

//  ex1 :   Retourner uniquement les commandes ayant le statut donne.

function filtrerParStatut(commandes, statut) {
     return commandes.filter(cmd => cmd.statut === statut);
}



console.log('--- filtrerParStatut ---');
console.log(filtrerParStatut(commandes, 'en_attente'));

// ex2 :  Retourner la somme totale des montants de toutes les commandes.

function calculerChiffreAffaires(commandes) {
  return commandes.reduce((total, cmd) => total + cmd.montant,0);
}

console.log('--- calculerChiffreAffaires ---');
console.log(calculerChiffreAffaires(commandes)); // 6030


// ex3 : Retourner l'objet commande avec le montant le plus eleve.


function commandeLaPlusElevee(commandes) {
  return commandes.reduce((max , cmd) => {
    if(max.montant > cmd.montant){
        return max;
    }
    else{
        return cmd;
    }

  });
}

console.log('--- commandeLaPlusElevee ---');
console.log(" The bigest montant is : ", commandeLaPlusElevee(commandes)); // CMD-006


// ex4:  Retourner un nouveau tableau ou chaque commande a un champ `prioritaire: true`
//       si son montant > 800 ET son statut est 'en_attente'.
 
function marquerPrioritaires(commandes) {

    return commandes.map(cmd => {
        return{
            ...cmd,
            prioritaire: cmd.montant > 800 && cmd.statut === "en_attente"
        };

    });
  
}
console.log('--- marquerPrioritaires ---');
console.log(marquerPrioritaires(commandes));


// ex5 :  Retourner un objet du type :
//    { en_attente: { count: N, total: X }, livree: { count: N, total: X }, ... }


function resumeParStatut(commandes) {
  let resume = {};

  commandes.forEach(cmd=>{
    if(!resume[cmd.statut]){
        resume[cmd.statut] = {count: 0 , total: 0};
    }
    resume[cmd.statut].count += 1;
    resume[cmd.statut].total += cmd.montant;
  });

  return resume;

}

console.log('--- resumeParStatut ---');
console.log(resumeParStatut(commandes));