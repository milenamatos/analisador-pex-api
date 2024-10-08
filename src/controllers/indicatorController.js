const { Indicator, Category } = require('../../db/models')

exports.get = async (req, res) => {
    const data = await Indicator.findAll({
        attributes: ['id', 'name', 'description', 'objective', 'formula'],
        include: {
            model: Category,
            attributes: ['label'],
            required: true
        }
    });

    return res.status(200).json(data);
}
