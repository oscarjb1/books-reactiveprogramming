import {
  LOAD_TWEETS,
  ADD_NEW_TWEET_SUCCESS,
  LIKE_TWEET_REQUEST,
} from '../actions/const'
import update from 'immutability-helper'

const initialState = {
  tweets: [],
  hasMore: false
}

export const tweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TWEETS:

      let newState = action.reset 
        ? action.tweets
        : update(state.tweets, { $push: action.tweets })

      return {
        tweets: newState,
        hasMore: action.tweets.length == 10
      }
    case ADD_NEW_TWEET_SUCCESS:
      return {
        tweets: action.tweets
      }
    case LIKE_TWEET_REQUEST:
      let targetIndex =
        state.tweets.map(x => { return x._id }).indexOf(action.tweetId)
      return update(state, {
        tweets: {
          [targetIndex]: {
            likeCounter: { $set: action.likeCounter },
            liked: { $apply: (x) => { return !x } }
          }
        }
      })
    default:
      return state
  }
}

export default tweetsReducer
