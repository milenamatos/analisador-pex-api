const goalController = require('./goalController')

exports.analyse = async (req, res) => {
		const relatedGoals = await goalController.getRelated(req, res)

    return res.status(200).json({ relatedGoals });
}
