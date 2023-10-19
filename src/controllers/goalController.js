const { Op, Sequelize } = require("sequelize");
const { Crossings } = require('../../db/models')

exports.getRelated = async (req, res) => {
	const { goals, indicators } = req.body
    
	const directRelations = await Crossings.findAll({
		attributes: [
			'indicator_id',
			[Sequelize.fn('array_agg', Sequelize.col('goal_id')), 'goals']
		],
		group: 'indicator_id',
		where: {
			[Op.and] : [
				{ indicator_id: indicators },
				{ [Op.or]: {
					relation: 'X',
					[Op.and]: [
						{ relation: 'O'},
						{ goal_id: goals }
					]}
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
			[Op.and] : [
				{ indicator_id: indicators },
				{ [Op.or]: {
					relation: 'I',
					[Op.and]: [
						{ relation: 'IO'},
						{ goal_id: goals }
					]}
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
