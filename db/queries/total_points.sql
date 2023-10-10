WITH subquery as 
(
  SELECT c.title as indicator, cg.title as goal, relation
	FROM "Crossings"
	INNER JOIN "Indicators" i on i.id = indicator_id
	INNER JOIN "Categories" c on c.id = i.category_id
	INNER JOIN "Goals" g on g.id = goal_id
	INNER JOIN "Categories" cg on cg.id = g.category_id
)
	
SELECT  indicator, goal,  
(
  SELECT qtd_direto + qtd_indireto 
  FROM
  (
    SELECT 2*count(*) as qtd_direto
    FROM subquery 
    WHERE relation IN('X', 'O') and indicator = s.indicator and goal = s.goal
  ) as direto,
  (
    SELECT count(*) as qtd_indireto
    FROM subquery 
    WHERE relation IN('I', 'IO') and indicator = s.indicator and goal = s.goal
  ) as indireto
) as soma

FROM subquery s
GROUP BY indicator, goal
ORDER BY indicator