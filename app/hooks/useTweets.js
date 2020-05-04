import { useState, useEffect } from 'react';
import APIInvoker from '../utils/APIInvoker'

function useTweets(username) {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        let url = username ? `/tweets/${username}` : '/tweets'
        APIInvoker.invokeGET(url, response => { setTweets(response.body)})
    }, [username]);

    return tweets;
}
export default useTweets