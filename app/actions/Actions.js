import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  UPDATE_LOGIN_FORM_REQUEST,
  SIGNUP_RESULT_FAIL,
  VALIDATE_USER_RESPONSE,
  UPDATE_SIGNUP_FORM_REQUEST,
  ADD_NEW_TWEET_SUCCESS,
  LOAD_TWEETS,
  LIKE_TWEET_REQUEST,
  LIKE_TWEET_DETAIL_REQUEST,
  UPDATE_REPLY_FORM,
  RESET_REPLY_FORM,
  LOAD_SUGESTED_USERS,
  LOGOUT_REQUEST,
  FIND_FOLLOWERS_FOLLOWINGS_REQUEST,
  RESET_FOLLOWERS_FOLLOWINGS_REQUEST,
  USER_PAGE_FOLLOW_USER,
  USER_PAGE_SAVE_CHANGES,
  USER_PAGE_AVATAR_UPDATE,
  USER_PAGE_BANNER_UPDATE,
  UPDATE_USER_PAGE_FORM_REQUEST,
  CANCEL_EDIT_MODEL_REQUEST,
  CHANGE_TO_EDIT_MODE_REQUEST,
  USER_PROFILE_REQUEST,
  LOAD_TWEET_DETAIL,
  ADD_NEW_TWEET_REPLY
} from './const'


import APIInvoker from '../utils/APIInvoker'
import { browserHistory } from 'react-router'
import update from 'react-addons-update'


//TwitterApp Component
export const relogin = () => (dispatch,getState) => {

  let token = window.localStorage.getItem("token")
  if(token == null){
    dispatch(loginFail())
    browserHistory.push('/login')
  }else{
    APIInvoker.invokeGET('/secure/relogin', response => {
      window.localStorage.setItem("token", response.token)
      window.localStorage.setItem("username", response.profile.userName)
      dispatch(loginSuccess( response.profile ))
    },error => {
      console.log("Error al autenticar al autenticar al usuario " )
      window.localStorage.removeItem("token")
      window.localStorage.removeItem("username")
      dispatch(loginFail())
      browserHistory.push('/login')
    })
  }
}

const loginSuccess = profile => ({
  type: LOGIN_SUCCESS,
  profile: profile
})

const loginFail = () => ({
  type: LOGIN_SUCCESS,
  profile: null
})


//Login Component
export const updateLoginForm = (field, value) => (dispatch, getState) => {
  dispatch(updateLoginFormRequest(field,value))
}

export const loginRequest = ()  => (dispatch, getState) => {

  let credential = {
    username: getState().loginFormReducer.username,
    password: getState().loginFormReducer.password
  }

  APIInvoker.invokePOST('/login',credential, response => {
    window.localStorage.setItem("token", response.token)
    window.localStorage.setItem("username", response.profile.userName)
    window.location = '/';
  },error => {
    dispatch(loginFailForm(error.message))
  })
}

const updateLoginFormRequest = (field, value) => ({
  type: UPDATE_LOGIN_FORM_REQUEST,
  field: field,
  value: value
})

const loginFailForm = (loginMessage) => ({
  type: LOGIN_ERROR,
  loginMessage: loginMessage
})

//Signup Component
export const  updateSignupForm = (field,value) => (dispatch, getState) => {
  dispatch(updateSignupFormRequest(field,value))
}

export const validateUser = (username) => (dispatch, getState) => {
  if(username.trim() === ''){
    return
  }
  APIInvoker.invokeGET('/usernameValidate/' + username, response => {
    dispatch(validateUserRequest(response.ok, response.message))
  },error => {
    dispatch(validateUserRequest(error.ok, error.message))
  })
}

export const signup = () => (dispatch, getState) => {
  let currentState = getState().signupFormReducer
  if(!currentState.license){
    dispatch(signupResultFail('Acepte los términos de licencia'))
  }else if(!currentState.userOk){
    dispatch(signupResultFail('Favor de revisar su nombre de usuario'))
  }else{
    let request = {
      "name": currentState.name,
      "username": currentState.username,
      "password": currentState.password
    }

    APIInvoker.invokePOST('/signup',request, response => {
      browserHistory.push('/login');
    },error => {
      dispatch(signupResultFail(error.error))
    })
  }
}

const updateSignupFormRequest = (field,value,fieldType) => ({
  type: UPDATE_SIGNUP_FORM_REQUEST,
  field: field,
  value: value,
  fieldType: fieldType
})

const validateUserRequest = (userOk, userOkMessage) => ({
  type: VALIDATE_USER_RESPONSE,
  userOk: userOk,
  userOkMessage: userOkMessage
})

const signupResultFail = (signupFailMessage) => ({
  type: SIGNUP_RESULT_FAIL,
  signupFail: true,
  signupFailMessage: signupFailMessage
})

//TweesContainer Component
export const getTweet = (username, onlyUserTweet) =>
  (dispatch, getState) => {
  APIInvoker.invokeGET('/tweets' + (onlyUserTweet  ? "/" + username : ""),
  response => {
    dispatch(loadTweetsSuccess(response.body))
  },error => {
    console.log("Error al cargar los Tweets");
  })
}

export const addNewTweet = (newTweet) => (dispatch, getState) => {
  APIInvoker.invokePOST('/secure/tweet',newTweet,  response => {
    newTweet._id = response.tweet._id
    let newState = update(getState().tweetsReducer, {
      tweets: {$splice: [[0, 0, newTweet]]}
    })

    dispatch(addNewTweetSuccess(newState.tweets))
  },error => {
    console.log("Error al cargar los Tweets");
  })
}

const loadTweetsSuccess = tweets => ({
  type: LOAD_TWEETS,
  tweets: tweets
})

const addNewTweetSuccess = tweets => ({
  type: ADD_NEW_TWEET_SUCCESS,
  tweets: tweets
})


//Tweet Component
export const likeTweet = (tweetId, like) => (dispatch, getState) => {
  let request = {
    tweetID: tweetId,
    like: like
  }

  APIInvoker.invokePOST('/secure/like', request, response => {
    dispatch(likeTweetRequest(tweetId, response.body.likeCounter))
  },error => {
    console.log("Error al cargar los Tweets");
  })
}

export const likeTweetDetail = (tweetId, like) => (dispatch, getState) => {
  let request = {
    tweetID: tweetId,
    like: like
  }

  APIInvoker.invokePOST('/secure/like', request, response => {
    dispatch(likeTweetDetailRequest(tweetId, response.body.likeCounter))
  },error => {
    console.log("Error al cargar los Tweets");
  })
}

const  likeTweetRequest = (tweetId, likeCounter) => ({
  type: LIKE_TWEET_REQUEST,
  tweetId: tweetId,
  likeCounter: likeCounter
})

const  likeTweetDetailRequest = (tweetId, likeCounter) => ({
  type: LIKE_TWEET_DETAIL_REQUEST,
  tweetId: tweetId,
  likeCounter: likeCounter
})

//Reply Component
export const updateReplyForm = (field,value) => (dispatch, getState) => {
  dispatch(updateReplyFormRequest(field,value))
}

export const resetReplyForm = () => (dispatch, getState) => {
  dispatch(resetReplyFormRequest())
}

const updateReplyFormRequest = (field,value) => ({
  type: UPDATE_REPLY_FORM,
  field: field,
  value: value
})

const resetReplyFormRequest = () => ({
  type: RESET_REPLY_FORM
})

//SeggestedUser Component
export const getSuggestedUsers = ()  => (dispatch, getState) => {
  APIInvoker.invokeGET('/secure/suggestedUsers', response => {
    dispatch(loadSuggestedUserSuccess(response.body))
  },error => {
    console.log("Error al actualizar el perfil");
  })
}

const loadSuggestedUserSuccess = users => ({
  type: LOAD_SUGESTED_USERS,
  users: users
})


//Toolbar Component
export const logout = () => (dispatch, getState) => {
  dispatch(logoutRequest())
}

const logoutRequest = () => ({
  type: LOGOUT_REQUEST
})

//Followers & Followings Components
export const findFollowersFollowings = (username, type) =>
(dispatch, getState) => {
  APIInvoker.invokeGET('/' + type + "/" + username, response => {
    dispatch(findFollowersFollowingsRequest(response.body))
  },error => {
    console.log("Error al obtener los seguidores");
  })
}

export const resetFollowersFollowings = () => (dispatch, getState) => {
  dispatch(resetFollowersFollowingsRequest())
}

const findFollowersFollowingsRequest = (users) => ({
  type: FIND_FOLLOWERS_FOLLOWINGS_REQUEST,
  users: users
})

const resetFollowersFollowingsRequest = () => ({
  type: RESET_FOLLOWERS_FOLLOWINGS_REQUEST
})

//UserPage Component
export const getUserProfile = (username)  => (dispatch, getState) => {
  APIInvoker.invokeGET('/profile/' + username, response => {
    dispatch(getUserProfileResponse(response.body))
  },error => {
    console.log("Error al cargar los Tweets", error);
  })
}

const getUserProfileResponse = (profile) => ({
  type: USER_PROFILE_REQUEST,
  edit: false,
  profile: profile
})

export const chageToEditMode = () => (dispatch, getState) => {
  let currentProfile = getState().userPageReducer.profile
  dispatch(changeToEditModeRequest(currentProfile))
}

const changeToEditModeRequest = (currentState) => ({
  type: CHANGE_TO_EDIT_MODE_REQUEST,
  edit: true,
  profile: currentState,
  currentState: currentState
})

export const cancelEditMode = () => (dispatch, getState) => {
  dispatch(cancelEditModeRequest())
}

const cancelEditModeRequest = () => ({
  type: CANCEL_EDIT_MODEL_REQUEST
})

export const updateUserPageForm = (event) => (dispatch, getState) => {
  dispatch(updateUserPageFormRequest(event.target.id, event.target.value))
}

const updateUserPageFormRequest = (field, value) => ({
  type: UPDATE_USER_PAGE_FORM_REQUEST,
  field: field,
  value: value
})

export const userPageImageUpload = (event) => (dispatch, getState) => {
  let id = event.target.id
  let reader = new FileReader();
  let file = event.target.files[0];

  if(file.size > 1240000){
    alert('La imagen supera el máximo de 1MB')
    return
  }

  reader.onloadend = () => {
    if(id == 'bannerInput'){
      dispatch(userPageBannerUpdateRequest(reader.result))
    }else{
      dispatch(userPageAvatarUpdateRequest(reader.result))
    }
  }
  reader.readAsDataURL(file)
}

const userPageBannerUpdateRequest = (img) => ({
  type: USER_PAGE_BANNER_UPDATE,
  img: img
})

const userPageAvatarUpdateRequest = (img) => ({
  type: USER_PAGE_AVATAR_UPDATE,
  img: img
})

export const userPageSaveChanges = () => (dispatch, getState) => {
  let state = getState().userPageReducer
  let request = {
    username: state.profile.userName,
    name: state.profile.name,
    description: state.profile.description,
    avatar: state.profile.avatar,
    banner: state.profile.banner
  }

  APIInvoker.invokePUT('/secure/profile', request, response => {
    dispatch(userPageSaveChangesRequest())
  },error => {
    console.log("Error al actualizar el perfil");
  })
}

const userPageSaveChangesRequest  = () => ({
  type: USER_PAGE_SAVE_CHANGES
})

export const followUser = (username) => (dispatch,getState) => {
  let request = {
    followingUser: username
  }

  APIInvoker.invokePOST('/secure/follow', request, response => {
    dispatch(followUserRequest(!response.unfollow))
  },error => {
    console.log("Error al actualizar el perfil");
  })
}

const followUserRequest = (follow) => ({
  type: USER_PAGE_FOLLOW_USER,
  follow: follow
})


//TweetsDetails Component
export const loadTweetDetail= (tweet) => (dispatch, getState) => {
  APIInvoker.invokeGET('/tweetDetails/'+tweet, response => {
    dispatch(loadTweetDetailRequest(response.body))
  },error => {
    console.log("Error al cargar los Tweets");
  })
}

const loadTweetDetailRequest = (tweetDetails) => ({
  type: LOAD_TWEET_DETAIL,
  tweetDetails: tweetDetails
})

export const addNewTweetReply = (newTweetReply, tweetParentID) => (dispatch, getState) => {
  let request = {
    tweetParent: tweetParentID,
    message: newTweetReply.message,
    image: newTweetReply.image
  }

  APIInvoker.invokePOST('/secure/tweet', request, response => {
    newTweetReply._id = response.tweet._id
    dispatch(addNewTweetReplyRequest(newTweetReply))
  },error => {
    console.log("Error al cargar los Tweets");
  })
}

const addNewTweetReplyRequest = (newTweetReply) => ({
  type: ADD_NEW_TWEET_REPLY,
  newTweetReply: newTweetReply
})
