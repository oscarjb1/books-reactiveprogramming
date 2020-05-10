import React, { useEffect } from 'react'
import Tweet from './Tweet'
import Reply from './Reply'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux'
import { getTweet, addTweet } from './redux/actions/tweetsActions'

const TweetsContainer = (props) => {

  const dispatch = useDispatch()

  const tweets = useSelector(state => state.tweets.tweets)
  const hasMore = useSelector(state => state.tweets.hasMore)

  useEffect(() => {
    const username = props.profile.userName
    const onlyUserTweet = props.onlyUserTweet
    dispatch(getTweet(username, onlyUserTweet, 0))
  }, [props.profile.userName, props.onlyUserTweet])

  const addNewTweet = (newTweet) => {
    dispatch(addTweet(newTweet))
  }

  const loadMore = (page) => {
    const username = props.profile.userName
    const onlyUserTweet = props.onlyUserTweet
    dispatch(getTweet(username, onlyUserTweet, page - 1))
  }

  return (
    <main className="twitter-panel">
      <Choose>
        <When condition={props.onlyUserTweet} >
          <div className="tweet-container-header">
            TweetsDD
            </div>
        </When>
        <Otherwise>
          <Reply profile={props.profile} operations={{ addNewTweet }} />
        </Otherwise>
      </Choose>
      <InfiniteScroll
        pageStart={1}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>} >

        <For each="tweet" of={tweets}>
          <Tweet key={tweet._id} tweet={tweet} />
        </For>
      </InfiniteScroll>
      <If condition={!hasMore} >
        <p className="no-tweets">No hay tweets que mostrar</p>
      </If>
    </main>
  )

}

TweetsContainer.propTypes = {
  onlyUserTweet: PropTypes.bool,
  profile: PropTypes.object
}

TweetsContainer.defaultProps = {
  onlyUserTweet: false,
  profile: {
    userName: ""
  }
}

export default TweetsContainer;
