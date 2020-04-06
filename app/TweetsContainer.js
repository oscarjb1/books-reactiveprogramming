import React from 'react'
import Tweet from './Tweet'
import Reply from './Reply'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTweet, addNewTweet } from './actions/Actions'
import InfiniteScroll from 'react-infinite-scroller';


class TweetsContainer extends React.Component {

  constructor(args) {
    super(args)
    let username = this.props.state.profile.userName
    let onlyUserTweet = this.props.onlyUserTweet
    this.props.getTweet(username, onlyUserTweet)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let prevUser = prevProps.state.profile.userName
    let newUser = this.props.state.profile.userName

    let prevUserTweet = prevProps.onlyUserTweet
    let newUserTweet = this.props.onlyUserTweet

    if (newUserTweet != prevUserTweet || prevUser != newUser) {
      let onlyUserTweet = this.props.onlyUserTweet
      this.props.getTweet(newUser, onlyUserTweet)
    }
  }

  addNewTweet(newTweet) {
    this.props.addNewTweet(newTweet)
  }

  loadFunc(page) {
    let username = this.props.state.profile.userName
    let onlyUserTweet = this.props.onlyUserTweet
    this.props.getTweet(username, onlyUserTweet, page - 1)
  }

  render() {
    let operations = {
      addNewTweet: this.addNewTweet.bind(this)
    }

    return (
      <main className="twitter-panel">
        <Choose>
          <When condition={this.props.state.onlyUserTweet} >
            <div className="tweet-container-header">
              Tweets
            </div>
          </When>
          <Otherwise>
            <Reply operations={operations} />
          </Otherwise>
        </Choose>
        <InfiniteScroll
          pageStart={1}
          loadMore={this.loadFunc.bind(this)}
          hasMore={this.props.state.hasMore}
          loader={<div className="loader" key={0}>Loading ...</div>} >

          <For each="tweet" of={this.props.state.tweets}>
            <Tweet key={tweet._id} tweet={tweet} />
          </For>
        </InfiniteScroll>
        <If condition={this.props.state.tweets.length == 0} >
          <p className="no-tweets">No hay tweets que mostrar</p>  
        </If>
      </main>
    )
  }
}

TweetsContainer.propTypes = {
  onlyUserTweet: PropTypes.bool
}

TweetsContainer.defaultProps = {
  onlyUserTweet: false
}

const mapStateToProps = (state) => {
  return {
    state: {
      profile: state.userPageReducer.profile,
      tweets: state.tweetsReducer.tweets,
      hasMore: state.tweetsReducer.hasMore,
      redux: state
    }
  }
}

export default connect(mapStateToProps,
  { getTweet, addNewTweet })(TweetsContainer);
