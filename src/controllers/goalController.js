const { Op, Sequelize } = require("sequelize");
const { Crossings, Goal, Category } = require('../../db/models')

exports.get = async (req, res) => {
	const data = await Goal.findAll({
			attributes: ['id', 'name'],
			include: {
					model: Category,
					attributes: ['label', 'title'],
					required: true
			}
	});

	return res.status(200).json(data);
}

exports.getRelated = async (body) => {
	const { goals, indicators } = body

	const directRelations = await Crossings.findAll({
		attributes: [
			'indicator_id',
			[Sequelize.fn('array_agg', Sequelize.col('goal_id')), 'goals']
		],
		group: 'indicator_id',
		where: {
			[Op.and]: [
				{ indicator_id: indicators },
				{
					[Op.or]: {
						relation: 'X',
						[Op.and]: [
							{ relation: 'O' },
							{ goal_id: goals }
						]
					}
				}
			]
		}
	});

	const indirectRelations = await Crossings.findAll({
		attributes: [
			'indicator_id',
			[Sequelize.fn('array_agg', Sequelize.col('goal_id')), 'goals']
		],
		group: 'indicator_id',
		where: {
			[Op.and]: [
				{ indicator_id: indicators },
				{
					[Op.or]: {
						relation: 'I',
						[Op.and]: [
							{ relation: 'IO' },
							{ goal_id: goals }
						]
					}
				}
			]
		}
	});

	const data = indicators.map(item => ({
		indicator_id: item,
		direct: directRelations.find(d => d.indicator_id === item)?.dataValues?.goals || [],
		indirect: indirectRelations.find(d => d.indicator_id === item)?.dataValues?.goals || []
	}))

	return data;
}

exports.getDistribution = async (body) => {
	const { indicators, goals } = body

	const result = await Crossings.count({
		attributes: [
			'goal_id'
		],
		group: ['goal_id', 'relation'],
		where: {
			[Op.and]: [
				{ indicator_id: indicators },
				{
					[Op.or]: [
						{ 
							[Op.or]: {
								relation: 'X',
								[Op.and]: [
									{ relation: 'O' },
									{ goal_id: goals }
								]
							}
						},
						{
							[Op.or]: {
								relation: 'I',
								[Op.and]: [
									{ relation: 'IO' },
									{ goal_id: goals }
								]
							}
						}
					]
				}
			]
		}
	});

	const data = result.map(item => ({
		id: item.goal_id,
		relation: (['X', 'O'].includes(item.relation)) ? 'direct' : 'indirect',
		count: item.count
	}))

	return data;
}
