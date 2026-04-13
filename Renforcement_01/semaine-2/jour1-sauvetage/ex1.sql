
-- Schema fourni :
--   employes(id, nom, prenom, departement_id, salaire, date_embauche, manager_id)
--   departements(id, nom, localisation, budget)
-->

-- Ex-- 1. Employes du departement Technologie, tries par salaire decroissant -->

select e.nom as name , e.prenom as familyName , e.salaire as salary
from employes e
INNER join departements dep on dep.id = e.departement_id
WHERE dep.nom = 'Technologie'
ORDER by e.salaire DESC;

-- Ex 2. Nombre d'employes par departement

select dep.nom ,count(e.id) as total
from departements dep
INNER join employes e on dep.id = e.departement_id
GROUP by dep.nom;

-- 3. Employes avec salaire superieur a la moyenne

select nom as name  , salaire as salary
from employes 
where salaire > (
    SELECT AVG(salaire)
    from employes );


-- 4. Employes embauch es en 2022 ou 2023 avec nom departement

select e.nom as name , e.prenom as familyName , dep.nom as departement_name , dep.localisation as localisation
from employes e
INNER JOIN departements dep on dep.id = e.departement_id
where e.date_embauche BETWEEN '2022-01-01' AND '2023-12-31';

--5  Departements dont la masse salariale > 50 000

select dep.nom as dep_name , SUM(e.salaire) as total
from employes e
INNER JOIN departements dep on dep.id = e.departement_id
group by dep.id , dep.nom
having SUM(e.salaire) < 50000;


-- 6. Employe le mieux paye par departement
SELECT dep.nom AS departement, e.nom, e.prenom, e.salaire
FROM employes e
JOIN departements dep ON dep.id = e.departement_id
WHERE e.salaire = (
		SELECT MAX(e2.salaire) from employes e2
		where e2.departement_id = e.departement_id);



