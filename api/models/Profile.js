var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var Tweet = require('./Tweet')

var profile = new Schema({
  name: {type: String},
  userName: {type: String, unique: true, index: true, uniqueCaseInsensitive: true},
  password: String,
  description: {type: String, default: 'Nuevo en Twitter'},
  avatar: {type: String, default: null},
  banner: {type: String, default: null},
  tweetCount: {type: Number, default: 0},
  followingRef: [{type: Schema.Types.ObjectId, ref: 'Profile', default: [] }],
  followersRef: [{type: Schema.Types.ObjectId, ref: 'Profile', default: [] }],
  date: {type: Date, default: Date.now},
});
//Helpers
profile.query.byUsername = function(userName){
  return this.find({userName: userName})
}
//Virtuals fields
profile.virtual('following').get(function(){
  return this.followingRef.length
})
profile.virtual('followers').get(function(){
  return this.followersRef.length
})

var Profile  = mongoose.model('Profile', profile);
module.exports= Profile
