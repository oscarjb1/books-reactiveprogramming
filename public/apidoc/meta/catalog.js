const loginPost = require('./login-post.js')
const reloginGet = require('./relogin-get.js')
const signupPost = require('./signup-post.js')
const profileGet = require('./profile-get.js')
const profilePut = require('./profile-put.js')
const followersGet = require('./followers-get.js')
const followingsGet = require('./followings-get.js')
const suggestedUsersGet = require('./suggestedUsers-get.js')
const followPost = require('./follow-post.js')
const usernameValidateGet = require('./usernamevalidate-get.js')
const tweetsGet = require('./tweets-get.js')
const tweetsusernameGet = require('./tweetsusername-get.js')
const addtweetsPost = require('./addtweets-post.js')
const tweetsdetailsGet = require('./tweetsdetails-get.js')
const tweetlikePost = require('./tweetlike-post.js')

module.exports = {
  services: [
    loginPost,
    reloginGet,
    signupPost,
    profileGet,
    profilePut,
    followersGet,
    followingsGet,
    suggestedUsersGet,
    followPost,
    usernameValidateGet,
    tweetsGet,
    tweetsusernameGet,
    addtweetsPost,
    tweetsdetailsGet,
    tweetlikePost
  ]
}
