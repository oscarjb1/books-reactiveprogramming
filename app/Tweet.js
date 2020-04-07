import React from 'react'
import PropTypes from 'prop-types'

class Tweet extends React.Component {

  render() {
    let tweet = this.props.tweet
    let tweetClass = null
    if (this.props.detail) {
      tweetClass = 'tweet detail'
    } else {
      tweetClass = tweet.isNew ? 'tweet fadeIn animated' : 'tweet'
    }

    return (
      <article className={tweetClass} id={"tweet-" + tweet._id}>
        <img src={tweet._creator.avatar} className="tweet-avatar" />
        <div className="tweet-body">
          <div className="tweet-user">
            <a href="#">
              <span className="tweet-name" data-ignore-onclick>
                {tweet._creator.name}</span>
            </a>
            <span className="tweet-username">
              @{tweet._creator.userName}</span>
          </div>
          <p className="tweet-message">{tweet.message}</p>
          <If condition={tweet.image != null}>
            <img className="tweet-img" src={tweet.image} />
          </If>
          <div className="tweet-footer">
            <a className={tweet.liked ? 'like-icon liked' : 'like-icon'}
              data-ignore-onclick>
              <i className="fa fa-heart " aria-hidden="true"
                data-ignore-onclick></i> {tweet.likeCounter}
            </a>
            <If condition={!this.props.detail} >
              <a className="reply-icon" data-ignore-onclick>
                <i className="fa fa-reply " aria-hidden="true"
                  data-ignore-onclick></i> {tweet.replys}
              </a>
            </If>
          </div>
        </div>
        <div id={"tweet-detail-" + tweet._id} />
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
