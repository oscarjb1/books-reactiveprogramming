import {
  LOGIN_SUCCESS,
  LOGOUT_REQUEST
} from '../actions/const'

const initialState = {
  load: false,
  profile: null
}

//Login Reducer
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        load: true,
        profile: action.profile
      }
    case LOGOUT_REQUEST:
      return initialState
    default:
      return state
  }
}

export default loginReducer
