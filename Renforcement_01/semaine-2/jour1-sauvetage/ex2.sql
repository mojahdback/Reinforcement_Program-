-- Ecrivez vos requetes ci-dessous

-- 1. Commandes avec nom client et nombre d'articles
    Select c.id, cli.nom, SUM(li.quantite) as total 
    from commandes c
    INNER join clients cli on c.client_id = cli.id
    inner join lignes_commande li on c.id = li.commande_id
    group by c.id, cli.nom;


-- 2. Montant total par commande

    Select c.id, cli.nom, SUM(li.quantite * li.prix_unitaire) as total 
    from commandes c
    INNER join clients cli on c.client_id = cli.id
    inner join lignes_commande li on c.id = li.commande_id
    group by c.id, cli.nom;



-- 3. Clients sans commande

  Select c.nom
  from clients c
  LEFT join commandes cmd on c.id = cmd.client_id
  where cmd.id IS NULL;




-- 4. Top 3 produits les plus vendus


-- 5. CA par categorie