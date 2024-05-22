const goalController = require('./goalController')
const crossingsController = require('./crossingsController')

exports.analyse = async (req, res) => {
  const goalsDistribution = await goalController.getDistribution(req.body)

  const pointsDistribution = await crossingsController.getPoints(req.body)

  return res.status(200).json({ goalsDistribution, pointsDistribution });
}

exports.preAnalyse = async (req, res) => {
  const data = await goalController.getRelated(req.body)

  return res.status(200).json(data);
}
