import {
  USER_PROFILE_REQUEST,
  CHANGE_TO_EDIT_MODE_REQUEST,
  CANCEL_EDIT_MODEL_REQUEST,
  UPDATE_USER_PAGE_FORM_REQUEST,
  USER_PAGE_AVATAR_UPDATE,
  USER_PAGE_BANNER_UPDATE,
  USER_PAGE_SAVE_CHANGES,
  USER_PAGE_FOLLOW_USER
} from '../actions/const'
import update from 'immutability-helper'

const initialState = {
  edit: false,
  profile:{
    name: "",
    description: "",
    avatar: null,
    banner: null,
    userName: ""
  }
}

export const userPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return {
        edit: false,
        profile: action.profile
      }
    case CHANGE_TO_EDIT_MODE_REQUEST:
      return {
        edit: action.edit,
        profile: action.profile,
        currentState: action.currentState
      }
    case CANCEL_EDIT_MODEL_REQUEST:
      return {
        edit: false,
        profile: state.currentState,
        currentState: null
      }
    case UPDATE_USER_PAGE_FORM_REQUEST:
      return update(state, {
        profile: {
          [action.field]: {$set: action.value}
        }
      })
    case USER_PAGE_BANNER_UPDATE:
      return update(state,{
        profile: {
          banner: {$set: action.img}
        }
      })
    case USER_PAGE_AVATAR_UPDATE:
      return update(state,{
        profile: {
          avatar: {$set: action.img}
        }
      })
    case USER_PAGE_SAVE_CHANGES:
      return update(state,{
        edit: {$set: false}
      })
    case USER_PAGE_FOLLOW_USER:
      return update(state, {
        profile:{
          follow: {$set: action.follow}
        }
      })
    default:
      return state
  }
}

export default userPageReducer
