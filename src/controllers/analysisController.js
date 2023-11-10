const goalController = require('./goalController')
const crossingsController = require('./crossingsController')

exports.analyse = async (req, res) => {
		const relatedGoals = await goalController.getRelated(req.body)

    const goalsDistribution = await goalController.getDistribution(req.body)

    const pointsDistribution = await crossingsController.getPoints(req.body)

    return res.status(200).json({ relatedGoals, goalsDistribution, pointsDistribution });
}
