import { combineReducers } from 'redux'
import userPageReducer from './userPageReducer'
import tweetsReduce from './tweetsReduce'

export default combineReducers({
    userPage: userPageReducer,
    tweets: tweetsReduce
})
