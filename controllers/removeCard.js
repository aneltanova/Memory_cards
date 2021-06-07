const Card = require('../models/Card.js')

module.exports = async (req, res) => {
    await Card.remove({
        ...req.body,
        userid: req.session.userId
    }, { new: true })
    console.log('ALL CARDS ARE REMOVED')
    res.redirect('/create')
}