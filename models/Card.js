const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 
const CardSchema = new Schema({
  term: String,
  body: String,
  userid: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
  },
  datePosted:{
  	type: Date, 
  	default: new Date()
  }
});

const Card = mongoose.model('Card',CardSchema);
module.exports = Card
