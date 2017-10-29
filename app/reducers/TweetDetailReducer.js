import {
  LOAD_TWEET_DETAIL,
  ADD_NEW_TWEET_REPLY,
  LIKE_TWEET_DETAIL_REQUEST
} from '../actions/const'
import update from 'react-addons-update'

let initialState = null

export const tweetDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TWEET_DETAIL:
      return action.tweetDetails
    case ADD_NEW_TWEET_REPLY:
      return update(state, {
          replysTweets: {$splice: [[0, 0, action.newTweetReply]]}
        })
    case LIKE_TWEET_DETAIL_REQUEST:
      if(state._id === action.tweetId){
        return update(state,{
          likeCounter : {$set: action.likeCounter},
          liked: {$apply: (x) => {return !x}}
        })
      }else{
        let targetIndex =
          state.replysTweets.map( x => {return x._id}).indexOf(action.tweetId)
        return update(state, {
          replysTweets: {
            [targetIndex]: {
              likeCounter : {$set: action.likeCounter},
              liked: {$apply: (x) => {return !x}}
            }
          }
        })
      }
    default:
      return state
  }
}

export default tweetDetailReducer
