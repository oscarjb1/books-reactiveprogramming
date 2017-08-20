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

  // handleLike(e){
  //   e.preventDefault()
  //   let request = {
  //     tweetID: this.state._id,
  //     like: !this.state.liked
  //   }
  //
  //   APIInvoker.invokePOST('/secure/like', request, response => {
  //     let newState = update(this.state,{
  //       likeCounter : {$set: response.body.likeCounter},
  //       liked: {$apply: (x) => {return !x}}
  //     })
  //     this.setState(newState)
  //   },error => {
  //     console.log("Error al cargar los Tweets", error);
  //   })
  // }

  // handleReply(e){
  //   $( "html" ).addClass( "modal-mode");
  //   e.preventDefault()
  //
  //   if(!this.props.detail){
  //     render(<TweetReply tweet={this.props.tweet} profile={this.state._creator} />, document.getElementById('dialog'))
  //   }
  // }

  // handleClick(e){
  //   if(e.target.getAttribute("data-ignore-onclick")){
  //     return
  //   }
  //   let url = "/" + this.state._creator.userName + "/" + this.state._id
  //   browserHistory.push(url)
  //   let tweetId = e.target.id
  // }

  render(){
    let tweetClass = null
    if(this.props.detail){
      tweetClass = 'tweet detail'
    }else{
      tweetClass = this.state.isNew ? 'tweet fadeIn animated' : 'tweet'
    }

    return (
        // <article  className={tweetClass} onClick={this.props.detail ? '' : this.handleClick.bind(this)} id={"tweet-" + this.state._id}>
        <article  className={tweetClass} id={"tweet-" + this.state._id}>
          <img src={this.state._creator.avatar} className="tweet-avatar" />
          <div className="tweet-body">
            <div className="tweet-user">
              {/* <Link to={"/" + this.state._creator.userName} > */}
              <a href="#">
                <span  className="tweet-name" data-ignore-onclick>
                  {this.state._creator.name}</span>
              </a>
              {/* </Link> */}
              <span className="tweet-username">
                @{this.state._creator.userName}</span>
            </div>
            <p className="tweet-message">{this.state.message}</p>
            <If condition={this.state.image != null}>
              <img className="tweet-img" src={this.state.image}/>
            </If>
            <div className="tweet-footer">
              {/* <a className={this.state.liked ? 'like-icon liked' : 'like-icon'} onClick={this.handleLike.bind(this)} data-ignore-onclick> */}
              <a className={this.state.liked ? 'like-icon liked' : 'like-icon'}
                data-ignore-onclick>
                <i className="fa fa-heart " aria-hidden="true"
                  data-ignore-onclick></i> {this.state.likeCounter}
              </a>
              <If condition={!this.props.detail} >
                {/* <a className="reply-icon" onClick={this.handleReply.bind(this)} data-ignore-onclick> */}
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
