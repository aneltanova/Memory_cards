module.exports = (req, res) =>{
  if(req.session.userId){
    return res.render("create", {
    	createCard: true
    });
  }
  res.redirect('/login')
}

const Card = require('../models/Card.js')
const User = require('../models/User.js')

module.exports = async (req, res) =>{
    const user = await User.findById(req.session.userId)
    const cards = await Card.find({"userid": req.session.userId})  
    console.log(req.session)     
    console.log(cards)  
    res.render('create',{
        user, 
        cards
    });
}