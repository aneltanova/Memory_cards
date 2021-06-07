const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const bcrypt = require('bcrypt');

var url = "/img/default.png";

const UserSchema = new Schema({  
  username: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true
  },
  userimage: {
    type: String,
    default: url
  }
});

UserSchema.plugin(uniqueValidator);
UserSchema.pre('save', function(next){
    const user = this      
    bcrypt.hash(user.password, 10,  (error, hash) => {        
      user.password = hash 
      next() 
    }); 
});

const User = mongoose.model('User',UserSchema);
module.exports = User
  