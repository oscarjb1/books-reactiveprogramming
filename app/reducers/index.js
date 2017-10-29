import { combineReducers } from 'redux'
import loginReducer from './LoginReducer'
import loginFormReducer from './LoginFormReducer'
import signupFormReducer from './SignupFormReducer'
import tweetsReducer from './TweetReducer'
import tweetDetailReducer from './TweetDetailReducer'
import replyReducer from './ReplyReducer'
import sugestedUserReducer from './SugestedUserReducer'
import followerReducer from './FollowerReducer'
import userPageReducer from './UserPageReducer'

export default combineReducers({
  loginReducer,
  loginFormReducer,
  signupFormReducer,
  tweetsReducer,
  tweetDetailReducer,
  replyReducer,
  sugestedUserReducer,
  followerReducer,
  userPageReducer
})
