const goalController = require('./goalController')

exports.analyse = async (req, res) => {
		const relatedGoals = await goalController.getRelated(req.body)

    const goalsDistribution = await goalController.getDistribution(req.body)

    return res.status(200).json({ relatedGoals, goalsDistribution });
}
