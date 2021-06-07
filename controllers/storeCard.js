const Card = require('../models/Card.js')

module.exports =  async (req, res)=>{ 
        await Card.create({
            ...req.body,
            userid: req.session.userId
        })
        res.redirect('/create')
}