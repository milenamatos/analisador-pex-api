const { Keyword, Goal, Category } = require('../db/models')

exports.get = async (req, res) => {
    const data = await Keyword.findAll({
        attributes: ['name'],
        include: {
            model: Goal,
            attributes: ['id'],
            required: true,
            include: {
                model: Category,
                attributes: ['label'],
                required: true
            }
        }
    });

    return res.status(200).json({ data });
}
