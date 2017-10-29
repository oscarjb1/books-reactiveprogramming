import {
  UPDATE_REPLY_FORM,
  RESET_REPLY_FORM
} from '../actions/const'
import update from 'react-addons-update'

let initialState = {
  focus: false,
  message: '',
  image: null
}

export const replyReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REPLY_FORM:
        return update(state, {
          [action.field]: {$set: action.value}
        })
    case RESET_REPLY_FORM:
      return initialState
    default:
      return state
  }
}

export default replyReducer
