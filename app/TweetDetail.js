import React from 'react'
import Reply from './Reply'
import Tweet from './Tweet'
import browserHistory from './History'
import { loadTweetDetail, addNewTweetReply } from './actions/Actions'
import { connect } from 'react-redux'

class TweetDetail extends React.Component{

  constructor(props){
    super(props)
    let tweet = this.props.match.params.tweet
    this.props.loadTweetDetail(tweet)
  }

  addNewTweet(newTweet){
    let oldState = this.state;
    let tweet = this.props.match.params.tweet
    this.props.addNewTweetReply(newTweet, tweet)
  }

  componentWillUnmount(){
    $( "html" ).removeClass( "modal-mode");
  }

  handleClose(){
    $( "html" ).removeClass( "modal-mode");
    browserHistory.goBack()
  }

  render(){
    $( "html" ).addClass( "modal-mode");

    let operations = {
      addNewTweet: this.addNewTweet.bind(this)
    }

    return(
      <div className="fullscreen">
        <Choose>
          <When condition={this.props.state == null}>
            <div className="tweet-detail">
              <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
            </div>
          </When>
          <Otherwise>
            <div className="tweet-detail">
              <i className="fa fa-times fa-2x tweet-close"
                aria-hidden="true"
                onClick={this.handleClose.bind(this)}/>
              <Tweet tweet={this.props.state} detail={true} />
              <div className="tweet-details-reply">
                <Reply profile={this.props.state._creator}
                  operations={operations}
                  key={"detail-" + this.props.state._id} newReply={false}/>
              </div>
              <ul className="tweet-detail-responses">
                <If condition={this.props.state.replysTweets != null} >
                  <For each="reply" of={this.props.state.replysTweets}>
                    <li className="tweet-details-reply" key={reply._id}>
                      <Tweet tweet={reply} detail={true}/>
                    </li>
                  </For>
                </If>
              </ul>
            </div>
          </Otherwise>
        </Choose>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.tweetDetailReducer
  }
}

export default connect(mapStateToProps,
  {loadTweetDetail, addNewTweetReply})(TweetDetail);
