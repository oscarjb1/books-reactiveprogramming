import React from 'react'
import Tweet from './Tweet'
import Reply  from './Reply'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTweet, addNewTweet } from './actions/Actions'

class TweetsContainer extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.state.profile.userName !==
        this.props.state.profile.userName){
      let username = this.props.state.profile.userName
      let onlyUserTweet = this.props.onlyUserTweet
      // this.loadTweets(username, onlyUserTweet)
      this.props.getTweet(username, onlyUserTweet)
    }
  }

  componentWillMount(){
    let username = this.props.state.profile.userName
    let onlyUserTweet = this.props.onlyUserTweet
    this.props.getTweet(username, onlyUserTweet)
  }

  addNewTweet(newTweet){
    this.props.addNewTweet(newTweet)
  }

  render(){

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
            <Reply operations={operations}/>
          </Otherwise>
        </Choose>
        <If condition={this.props.state.tweets != null}>
          <For each="tweet" of={this.props.state.tweets}>
            <Tweet key={tweet._id} tweet={tweet}/>
          </For>
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
      tweets: state.tweetsReducer.tweets
    }
  }
}

export default connect(mapStateToProps,
  {getTweet, addNewTweet})(TweetsContainer);
