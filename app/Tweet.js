import React from 'react'
// import update from 'react-addons-update'
// import { Link } from 'react-router'
// import { browserHistory } from 'react-router'
import APIInvoker from './utils/APIInvoker'
// import TweetReply from './TweetReply'
import { render } from 'react-dom';
import PropTypes from 'prop-types'

class Tweet extends React.Component{

  constructor(props){
    super(props)
    this.state = props.tweet
    props.tweet.hola = "hola"
  }

  render(){
    let tweetClass = null
    if(this.props.detail){
      tweetClass = 'tweet detail'
    }else{
      tweetClass = this.state.isNew ? 'tweet fadeIn animated' : 'tweet'
    }

    return (
        <article  className={tweetClass} id={"tweet-" + this.state._id}>
          <img src={this.state._creator.avatar} className="tweet-avatar" />
          <div className="tweet-body">
            <div className="tweet-user">
              <a href="#">
                <span  className="tweet-name" data-ignore-onclick>
                  {this.state._creator.name}</span>
              </a>
              <span className="tweet-username">
                @{this.state._creator.userName}</span>
            </div>
            <p className="tweet-message">{this.state.message}</p>
            <If condition={this.state.image != null}>
              <img className="tweet-img" src={this.state.image}/>
            </If>
            <div className="tweet-footer">
              <a className={this.state.liked ? 'like-icon liked' : 'like-icon'}
                data-ignore-onclick>
                <i className="fa fa-heart " aria-hidden="true"
                  data-ignore-onclick></i> {this.state.likeCounter}
              </a>
              <If condition={!this.props.detail} >
                <a className="reply-icon" data-ignore-onclick>
                  <i className="fa fa-reply " aria-hidden="true"
                    data-ignore-onclick></i> {this.state.replys}
                </a>
              </If>
            </div>
          </div>
          <div id={"tweet-detail-" + this.state._id}/>
        </article>
    )
  }
}

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
  detail: PropTypes.bool
}

Tweet.defaultProps = {
  detail: false
}


export default Tweet;
