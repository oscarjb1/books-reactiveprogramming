import React from 'react'
import Reply from './Reply'
import Tweet from './Tweet'
import APIInvoker from './utils/APIInvoker'
import update from 'immutability-helper'
import browserHistory from './History'

class TweetDetail extends React.Component{

  componentDidMount(){
    let tweet = this.props.match.params.tweet
    APIInvoker.invokeGET('/tweetDetails/'+tweet, response => {
      this.setState( response.body)
    },error => {
      console.log("Error al cargar los Tweets");
    })
  }

  addNewTweet(newTweet){
    let oldState = this.state;
    let newState = update(this.state, {
      replysTweets: {$splice: [[0, 0, newTweet]]}
    })
    this.setState(newState)

    let request = {
      tweetParent: this.props.match.params.tweet,
      message: newTweet.message,
      image: newTweet.image
    }

    APIInvoker.invokePOST('/secure/tweet', request, response => {
    },error => {
      console.log("Error al crear los Tweets");
    })
  }

  handleClose(){
    $( "html" ).removeClass( "modal-mode");
    browserHistory.goBack()
  }

  render(){
    return(
      <>
        <Choose>
          <When condition={this.state == null}>
            <div className="tweet-detail">
              <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
            </div>
          </When>
          <Otherwise>
            <div className="tweet-detail">
              <i className="fa fa-times fa-2x tweet-close"
                aria-hidden="true"
                onClick={this.handleClose.bind(this)}/>
              <Tweet tweet={this.state} detail={true} />
              <div className="tweet-details-reply">
                <Reply profile={this.state._creator}
                  operations={{addNewTweet: this.addNewTweet.bind(this)}}
                  key={"detail-" + this.state._id} newReply={false}/>
              </div>
              <ul className="tweet-detail-responses">
                <If condition={this.state.replysTweets != null} >
                  <For each="reply" of={this.state.replysTweets}>
                    <li className="tweet-details-reply" key={reply._id}>
                      <Tweet tweet={reply} detail={true}/>
                    </li>
                  </For>
                </If>
              </ul>
            </div>
          </Otherwise>
        </Choose>
      </>
    )
  }
}
export default TweetDetail;
