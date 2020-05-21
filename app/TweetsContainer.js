import React from 'react'
import Tweet from './Tweet'
import APIInvoker from "./utils/APIInvoker"
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'

class TweetsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasMore: true,
      tweets: []
    }
    this.loadMore = this.loadMore.bind(this)
  }

  loadTweets(username, onlyUserTweet, page) {
    let currentPage = page || 0
    const url = `/tweets${onlyUserTweet ? "/" + username : ""}?page=${currentPage}`

    APIInvoker.invokeGET(url, response => {
      this.setState({
        tweets: this.state.tweets.concat(response.body),
        hasMore: response.body.length >= 10
      })
    }, error => {
      console.log("Error al cargar los Tweets", error);
    })
  }

  loadMore(page) {
    const username = this.props.profile.userName
    const onlyUserTweet = this.props.onlyUserTweet
    this.loadTweets(username, onlyUserTweet, page - 1)
  }

  render() {
    console.log("tweets => ", this.state.tweets)
    return (
      <main className="twitter-panel">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={this.state.hasMore}
          loader={<div className="loader" key={0}>Loading ...</div>} >
          <For each="tweet" of={this.state.tweets}>
            <Tweet key={tweet._id} tweet={tweet} />
          </For>
        </InfiniteScroll>
      </main>
    )
  }
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