var mongoose = require('mongoose')
var Schema = mongoose.Schema

var tweet = Schema({
  _creator: {type: Schema.Types.ObjectId, ref: 'Profile'},
  tweetParent: {type: Schema.Types.ObjectId, ref: 'Tweet'},
  date: {type: Date, default: Date.now},
  message: String,
  likeRef: [{type: Schema.Types.ObjectId, ref: 'Profile', default: []}],
  image: {type: String},
  replys: {type: Number, default: 0}
})
//Virtuals fields
tweet.virtual('likeCounter').get(function(){
  return this.likeRef.length
})
var Tweet = mongoose.model('Tweet', tweet);
module.exports= Tweet
