import {
  FIND_FOLLOWERS_FOLLOWINGS_REQUEST,
  RESET_FOLLOWERS_FOLLOWINGS_REQUEST
} from '../actions/const'

const initialState = {
  users: []
}

export const followerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_FOLLOWERS_FOLLOWINGS_REQUEST:
      return {
        users: action.users
      }
    case RESET_FOLLOWERS_FOLLOWINGS_REQUEST:
      return initialState
    default:
      return state

  }
}

export default followerReducer
