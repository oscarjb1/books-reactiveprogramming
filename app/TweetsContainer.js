import React from 'react'
import Tweet from './Tweet'
import APIInvoker from "./utils/APIInvoker"
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'
import Reply from './Reply'
import update from 'immutability-helper'


class TweetsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasMore: true,
      tweets: []
    }
    this.loadMore = this.loadMore.bind(this)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let prevUser = prevProps.profile.userName
    let newUser = this.props.profile.userName

    let prevUserTweet = prevProps.onlyUserTweet
    let newUserTweet = this.props.onlyUserTweet

    if (newUserTweet != prevUserTweet || prevUser != newUser) {
      let onlyUserTweet = this.props.onlyUserTweet
      this.loadTweets(newUser, onlyUserTweet, 0)
    }
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

  addNewTweet(newTweet) {
    let oldState = this.state;
    let newState = update(this.state, {
      tweets: { $splice: [[0, 0, newTweet]] }
    })

    this.setState(newState)

    //Optimistic Update
    APIInvoker.invokePOST('/secure/tweet', newTweet, response => {
      this.setState(update(this.state, {
        tweets: {
          0: {
            _id: { $set: response.tweet._id }
          }
        }
      }))
    }, error => {
      console.log("Error al cargar los Tweets");
      this.setState(oldState)
    })
  }



  render() {
    console.log("tweets => ", this.state.tweets)

    let operations = {
      addNewTweet: this.addNewTweet.bind(this)
    }

    return (
      <main className="twitter-panel">

        <Choose>
          <When condition={this.props.onlyUserTweet} >
            <div className="tweet-container-header">
              TweetsDD
	          </div>
          </When>
          <Otherwise>
            <Reply profile={this.props.profile} operations={operations} />
          </Otherwise>
        </Choose>

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