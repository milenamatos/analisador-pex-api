const { Keyword } = require('../db/models')

exports.get = async (req, res) => {
    const data = await Keyword.findAll({
        attributes: ['id', 'name']
    });

    return res.status(200).json({ data });
}
