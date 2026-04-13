//  Contexte :
//  * Vous travaillez sur le module de reporting d'une plateforme SaaS.
//  * Le service comptabilite a besoin d'un rapport mensuel automatique
//  * genere a partir du journal des transactions.


const transactions = [
  { id: 'T001', clientId: 'C01', nom: 'Alami SA',       montant: 1200, date: '2024-01-08' },
  { id: 'T002', clientId: 'C02', nom: 'Benali SARL',    montant: 450,  date: '2024-01-15' },
  { id: 'T003', clientId: 'C03', nom: 'Chraibi Corp',   montant: 8900, date: '2024-01-22' },
  { id: 'T004', clientId: 'C01', nom: 'Alami SA',       montant: 2300, date: '2024-02-05' },
  { id: 'T005', clientId: 'C04', nom: 'Drissi SARL',    montant: 670,  date: '2024-02-14' },
  { id: 'T006', clientId: 'C02', nom: 'Benali SARL',    montant: 3100, date: '2024-02-20' },
  { id: 'T007', clientId: 'C05', nom: 'El Fassi Ltd',   montant: 980,  date: '2024-02-28' },
  { id: 'T008', clientId: 'C03', nom: 'Chraibi Corp',   montant: 15000,date: '2024-03-03' },
  { id: 'T009', clientId: 'C01', nom: 'Alami SA',       montant: 4200, date: '2024-03-11' },
  { id: 'T010', clientId: 'C04', nom: 'Drissi SARL',    montant: 890,  date: '2024-03-19' },
  { id: 'T011', clientId: 'C02', nom: 'Benali SARL',    montant: 1750, date: '2024-03-25' },
  { id: 'T012', clientId: 'C05', nom: 'El Fassi Ltd',   montant: 630,  date: '2024-03-30' },
];

// ex 1 : rapportMensuel(transactions)
//  *    Retourner un tableau trie par mois (format 'YYYY-MM') contenant pour chaque mois :
//  *    { mois, nombreTransactions, totalHT, totalTVA, totalTTC, transactionMax }
//  *    - totalTVA = totalHT * 0.20
//  *    - totalTTC = totalHT + totalTVA
//  *    - transactionMax : le montant le plus eleve du mois
  

function rapportMensuel(transactions) {

    const moisData = {};

    for (let i = 0; i < transactions.length; i++) {

        const t = transactions[i];
        const mois = t.date.slice(0,7);

        if (!moisData[mois]) {
            moisData[mois] = {
                mois: mois,
                nombreTransactions: 0,
                totalHT: 0,
                transactionMax: 0
            };
        }

        moisData[mois].nombreTransactions++;
        moisData[mois].totalHT += t.montant;

        if (t.montant > moisData[mois].transactionMax) {
            moisData[mois].transactionMax = t.montant;
        }
    }

    const result = [];

    for (const mois in moisData) {

        const totalHT = moisData[mois].totalHT;
        const totalTVA = totalHT * 0.20;
        const totalTTC = totalHT + totalTVA;

        result.push({
            mois: mois,
            nombreTransactions: moisData[mois].nombreTransactions,
            totalHT: totalHT,
            totalTVA: totalTVA,
            totalTTC: totalTTC,
            transactionMax: moisData[mois].transactionMax
        });
    }

    result.sort((a,b) => a.mois.localeCompare(b.mois));

    return result;
}

 console.log(rapportMensuel(transactions));

// ex 2 :  top3Clients(transactions)
//  *    Retourner les 3 clients ayant depense le plus au total (sur toute la periode).
//  *    Format : [{ clientId, nom, total, nombreAchats }]

function top3Clients(transactions) {

    clients = {};

    for(let i = 0 ; i< transactions.length ; i++){

        const t = transactions[i];

        if(!clients[t.clientId]){
            clients[t.clientId] = {
            clientId : t.clientId,
            nom : t.nom,
            total : 0 ,
            nombreAchats : 0
            };
        }

        clients[t.clientId].total += t.montant;
        clients[t.clientId].nombreAchats++; 

    }

    let result = Object.values(clients);

    result.sort((a,b) => b.total - a.total);

    return result.slice(0,3);
  
}

console.log('--- Top 3 clients ---');
console.log(top3Clients(transactions));

// ex 3 :  evolutionMensuelle(transactions)
//  *    Retourner un tableau indiquant pour chaque mois (sauf le premier)
//  *    le pourcentage d'evolution du CA vs le mois precedent.
//  *    Format : [{ mois, totalHT, evolution }]
//  *    evolution est un nombre arrondi a 1 decimale (ex: +12.3 ou -5.7)

function evolutionMensuelle(transactions) {

  
}