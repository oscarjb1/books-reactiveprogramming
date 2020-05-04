import {
    LOAD_TWEETS,
    RESET_TWEETS,
    ADD_NEW_TWEET
} from '../consts'
import APIInvoker from '../../utils/APIInvoker'

export const resetTweets = () => (dispatch, getState) => {
    dispatch({
        type: RESET_TWEETS
    })
}

export const getTweet = (username, onlyUserTweet, page) => (dispatch, getState) => {
    let currentPage = page || 0
    const url = `/tweets${onlyUserTweet ? "/" + username : ""}?page=${currentPage}`
    APIInvoker.invokeGET(url, response => {
        dispatch({
            type: LOAD_TWEETS,
            tweets: response.body,
            reset: currentPage == 0
        })

    }, error => {
        console.log("Error al cargar los Tweets")
    })
}

export const addTweet = (newTweet) => (dispatch, getState) => {
    APIInvoker.invokePOST('/secure/tweet', newTweet, response => {
        dispatch({
            type: ADD_NEW_TWEET,
            value: {
                ...newTweet,
                _id: response.tweet._id
            }
        })
    }, error => {
        console.log("Error al cargar los Tweets");
    })
}