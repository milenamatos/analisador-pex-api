const { QueryTypes } = require("sequelize");
const { sequelize } = require('../../db/models')

exports.getPoints = async (body) => {
	const { goals, indicators, removedItems } = body

	const removeItemsQuery = removedItems.length ?
		removedItems.map(item => {
			return `AND NOT (
				s.indicator_id = ${item.indicatorId}
				AND s.goal_id = ${item.goalId}
			  AND s.relation IN (${item.type == 'direct' ? `'X', 'O'` : `'I', 'IO'`})
			)`
		}).join(" ")
		: ""

	const result = await sequelize.query(
		`WITH subquery as 
		(
			SELECT c.title as indicator, c.id as indicator_category, i.id as indicator_id, cg.title as goal, g.id as goal_id, relation
			FROM "Crossings"
			INNER JOIN "Indicators" i on i.id = indicator_id
			INNER JOIN "Categories" c on c.id = i.category_id
			INNER JOIN "Goals" g on g.id = goal_id
			INNER JOIN "Categories" cg on cg.id = g.category_id
		),
		selected as 
		(
				SELECT * FROM subquery s
				WHERE s.indicator_id IN(:indicators)
				${removeItemsQuery}
		)
			
		SELECT indicator, goal,  
		(
			SELECT qtd_direto + qtd_indireto 
			FROM
			(
				SELECT 2*count(*) as qtd_direto
				FROM selected 
				WHERE indicator = s.indicator AND goal = s.goal
				AND (
					relation = 'X' OR
					(relation = 'O' AND goal_id IN(:goals))
				)
			) as direto,
			(
				SELECT count(*) as qtd_indireto
				FROM selected 
				WHERE indicator = s.indicator AND goal = s.goal
				AND (
					relation = 'I' OR
					(relation = 'IO' AND goal_id IN(:goals))
				)
			) as indireto
		) as points
		
		FROM subquery s
		GROUP BY indicator, indicator_category, goal
		ORDER BY indicator_category, goal desc`,
		{
			type: QueryTypes.SELECT,
			replacements: { indicators, goals, removeItemsQuery }
		});

	const formattedData = result.reduce((result, { indicator, goal, points }) => {
		const foundItem = result.find(i => i.indicator === indicator)
		if (!foundItem) {
			result.push({
				indicator,
				goals: [{ goal, points }]
			})
		}
		else {
			foundItem.goals.push({ goal, points })
		}
		return result;
	}, [])

	return formattedData;
}
