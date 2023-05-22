WITH subquery as 
(SELECT c.title as title1, cg.title as title2, relation
	FROM public.crossing_matrix
	INNER JOIN indicators i on i.id = indicator_id
	INNER JOIN categories c on c.id = i.category_id
	INNER JOIN goals g on g.id = goal_id
	INNER JOIN categories cg on cg.id = g.category_id)
	
SELECT  title1, title2,  

(SELECT qtd_direto + qtd_indireto FROM

(SELECT 2*count(*) as qtd_direto
  FROM subquery 
  where relation IN('X', 'O') and title1 = s.title1 and title2 = s.title2) as direto,
  
  (SELECT count(*) as qtd_indireto
  FROM subquery 
  where relation IN('I', 'IO') and title1 = s.title1 and title2 = s.title2) as indireto
 ) as soma

FROM subquery s
group by title1, title2
order by title1