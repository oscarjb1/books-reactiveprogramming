import React from 'react'
import Reply from './Reply'
import Tweet from './Tweet'
import APIInvoker from './utils/APIInvoker'
import update from 'react-addons-update'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import { loadTweetDetail, addNewTweetReply } from './actions/Actions'
import { connect } from 'react-redux'

class TweetDetail extends React.Component{

  constructor(props){
    super(props)
  }

  componentWillMount(){
    let tweet = this.props.params.tweet
    this.props.loadTweetDetail(tweet)
  }



  addNewTweet(newTweet){
    let oldState = this.state;
    this.props.addNewTweetReply(newTweet, this.props.params.tweet)
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
