const bcrypt = require('bcrypt')
const User = require('../models/User.js')

module.exports = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id
          res.redirect('/index')
        }
        else {
          req.flash('validationErrors', "Error: Check if the entered data is correct")
          res.redirect('/login')
        }
      })
    }
    else {
      req.flash('validationErrors', "Error: User does not exist ):")
      res.redirect('/login')
    }
  })
}