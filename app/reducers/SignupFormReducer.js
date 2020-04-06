import {
  UPDATE_SIGNUP_FORM_REQUEST,
  VALIDATE_USER_RESPONSE,
  SIGNUP_RESULT_FAIL
} from '../actions/const'
import update from 'immutability-helper'

const initialState = {
  username: "",
  name: "",
  password: "",
  license: false,
  userOk: false,
  userOkMessage: null,
  signupFail: false,
  signupFailMessage: null
}


export const signupFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SIGNUP_FORM_REQUEST:
      return update(state, {
        [action.field]: {$set: action.value}
      })
    case VALIDATE_USER_RESPONSE:
      return update(state,{
        userOk: {$set: action.userOk},
        userOkMessage: {$set: action.userOkMessage}
      })
    case SIGNUP_RESULT_FAIL:
      return update(state, {
        signupFail: {$set: action.signupFail},
        signupFailMessage: {$set: action.signupFailMessage}
      })
    default:
      return state
  }
}

export default signupFormReducer
