import {
  LOAD_TWEETS,
  ADD_NEW_TWEET_SUCCESS,
  CLEAR_TWEETS,
  LIKE_TWEET_REQUEST
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  tweets: []
}

export const  tweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TWEETS:
      return {
        tweets: action.tweets
      }
    case ADD_NEW_TWEET_SUCCESS:
      return {
        tweets: action.tweets
      }
    case LIKE_TWEET_REQUEST:
      let targetIndex =
        state.tweets.map( x => {return x._id}).indexOf(action.tweetId)
      return update(state, {
        tweets: {
          [targetIndex]: {
            likeCounter : {$set: action.likeCounter},
            liked: {$apply: (x) => {return !x}}
          }
        }
      })
    default:
      return state
  }
}

export default tweetsReducer
