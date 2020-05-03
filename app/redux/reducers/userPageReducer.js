import {
    USERPAGE_RESET,
    LOAD_USERPROFILE,
    LOAD_FOLLOWERS,
    LOAD_FOLLOWINGS,
    TOGGLE_EDIT_MODE,
    FOLLOW_USER,
    EDIT_PROFILE,
    SAVE_PROFILE,
} from '../consts'
import update from 'immutability-helper'

const initialState = {
    edit: false,
    profile: null,
    followers: null,
    followings: null
}

export const userPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERPAGE_RESET:
            return initialState
        case TOGGLE_EDIT_MODE:
            if (!state.edit) {
                //change to edit mode and backup current state
                return update(state, {
                    edit: { $set: !state.edit },
                    profileBackup: { $set: state.profile }
                })
            } else {
                //cancel edir mode and restore previous state
                return update(state, {
                    edit: { $set: !state.edit },
                    profile: { $set: state.profileBackup }
                })
            }
        case SAVE_PROFILE:
            return update(state, {
                edit: { $set: false },
                profileBackup: { $set: undefined }
            })
        case LOAD_USERPROFILE:
            return update(state, {
                profile: { $set: action.value }
            })
        case FOLLOW_USER:
            return update(state, {
                profile: {
                    follow: { $set: action.value }
                }
            })
        case EDIT_PROFILE: {
            return update(state, {
                profile: {
                    [action.value.id]: { $set: action.value.value }
                }
            })
        }
        case LOAD_FOLLOWERS: {
            return update(state, {
                followers: { $set: action.value }
            })
        }
        case LOAD_FOLLOWINGS: {
            return update(state, {
                followings: { $set: action.value }
            })
        }
        default:
            return state
    }
}
export default userPageReducer