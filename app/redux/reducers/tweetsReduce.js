import {
    LOAD_TWEETS,
    ADD_NEW_TWEET,
    LIKE_TWEET_REQUEST,
    RESET_TWEETS
} from '../consts'

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
                hasMore: action.tweets.length >= 10
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
        case ADD_NEW_TWEET:
            return update(state, {
                tweets: { $splice: [[0, 0, action.value]] }
            })
        case RESET_TWEETS:
            return initialState
        default:
            return state
    }
}

export default tweetsReducer