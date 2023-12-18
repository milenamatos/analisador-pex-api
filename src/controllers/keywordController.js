const { Keyword, Goal, Category } = require('../../db/models')

exports.get = async (req, res) => {
    const data = await Keyword.findAll({
        attributes: ['id', 'name'],
        include: {
            model: Goal,
            attributes: ['id', 'name'],
            required: true,
            include: {
                model: Category,
                attributes: ['label'],
                required: true
            }
        }
    });

    const groupedKeywords = []
    data.forEach((keyword) => {
        const { id, name, dataValues } = keyword
        const foundItem = groupedKeywords.find(item => item.name === name)
        if (foundItem) {
            groupedKeywords.find(item => item.name === name).goals.push(dataValues?.Goal)
        }
        else {
            const item = { id, name, goals: [keyword.dataValues?.Goal]}
            groupedKeywords.push(item)
        }
    })

    return res.status(200).json(groupedKeywords);
}
