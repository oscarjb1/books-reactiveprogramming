import React from 'react'
import Tweet from './Tweet'
import APIInvoker from "./utils/APIInvoker"
import PropTypes from 'prop-types'

class TweetsContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      tweets: []
    }

    let username = this.props.profile.userName
    let onlyUserTweet = this.props.onlyUserTweet
    this.loadTweets(username, onlyUserTweet)
  }

  loadTweets(username, onlyUserTweet){
    let url = '/tweets' + (onlyUserTweet  ? "/" + username : "")
    APIInvoker.invokeGET(url, response => {
      this.setState({
        tweets: response.body
      })
    },error => {
      console.log("Error al cargar los Tweets", error);
    })
  }

  render(){

    return (
      <main className="twitter-panel">
        <If condition={this.state.tweets != null}>
          <For each="tweet" of={this.state.tweets}>
            <Tweet key={tweet._id} tweet={tweet}/>
          </For>
        </If>
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
