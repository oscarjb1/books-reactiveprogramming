import {
  LOAD_SUGESTED_USERS
} from '../actions/const'

const initialState = {
  load: false,
  users: []
}


export const sugestedUserReducer = (state = initialState,action) => {
  switch (action.type) {
    case LOAD_SUGESTED_USERS:
      return {
        load: true,
        users: action.users
      }
    default:
      return state
  }
}

export default sugestedUserReducer
