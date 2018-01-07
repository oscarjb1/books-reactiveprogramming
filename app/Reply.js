import React from 'react'
import update from 'react-addons-update'
import config from '../config.js'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateReplyForm, resetReplyForm } from './actions/Actions'

const uuidV4 = require('uuid/v4');

class Reply extends React.Component{

  constructor(props){
    super(props)
  }

  handleChangeMessage(e){
    this.props.updateReplyForm(e.target.name,e.target.value)
  }

  handleMessageFocus(e){
    this.props.updateReplyForm('focus',true)
  }

  handleMessageFocusLost(e){
    if(this.props.state.reply.message.length=== 0){
      this.props.resetReplyForm()
    }
  }

  handleKeyDown(e){
    //Scape key
    if(e.keyCode === 27){
      this.reset();
    }
  }

  reset(){
    this.props.resetReplyForm()
    this.refs.reply.blur();
  }

  newTweet(e){
    e.preventDefault();

    let tweet = {
      isNew: true,
      _id: uuidV4(),
      _creator: {
        _id: this.props.state.profile._id,
        name: this.props.state.profile.name,
        userName: this.props.state.profile.userName,
        avatar: this.props.state.profile.avatar
      },
      date: Date.now,
      message: this.props.state.reply.message,
      image: this.props.state.reply.image,
      liked: false,
      likeCounter: 0
    }

    this.props.operations.addNewTweet(tweet)
    this.props.resetReplyForm()
  }

  imageSelect(e){
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if(file.size > 1240000){
      alert('La imagen supera el máximo de 1MB')
      return
    }

    reader.onloadend = () => {
      this.props.updateReplyForm('image', reader.result)
    }
    reader.readAsDataURL(file)
  }


  render(){
    let randomID = uuidV4();

    let reply = this.props.state.reply

    return (
      <section className="reply">
        <img src={this.props.state.profile.avatar}
          className="reply-avatar"/>
        <div className="reply-body">
          <textarea
            ref="reply"
            name="message"
            type="text"
            maxLength = {config.tweets.maxTweetSize}
            placeholder="¿Qué está pensando?"
            className={reply.focus ? 'reply-selected' : ''}
            value={reply.message}
            onKeyDown={this.handleKeyDown.bind(this)}
            onBlur={this.handleMessageFocusLost.bind(this)}
            onFocus={this.handleMessageFocus.bind(this)}
            onChange={this.handleChangeMessage.bind(this)}
            />
            <If condition={reply.image != null} >
              <div className="image-box">
                <img src={reply.image}/>
              </div>
            </If>
        </div>
        <div className={reply.focus ?
          'reply-controls' : 'hidden'}>
          <label htmlFor={"reply-camara-" + randomID}
            className={reply.message.length===0 ?
              'btn pull-left disabled' : 'btn pull-left'}>
            <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
          </label>

          <input href="#"
            className={reply.message.length===0 ?
              'btn pull-left disabled' : 'btn pull-left'}
            accept=".gif,.jpg,.jpeg,.png"
            type="file"
            onChange={this.imageSelect.bind(this)}
            id={"reply-camara-" + randomID}>
          </input>

          <span ref="charCounter" className="char-counter">
            {config.tweets.maxTweetSize - reply.message.length }
          </span>

          <button className={reply.message.length===0 ?
              'btn btn-primary disabled' : 'btn btn-primary '}
              onClick={this.newTweet.bind(this)}
              >
            <i className="fa fa-twitch" aria-hidden="true"></i>   Twittear
          </button>
        </div>
      </section>
    )
  }
}

Reply.propTypes = {
  profile: PropTypes.object,
  operations: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    state:{
      reply: state.replyReducer,
      profile: state.loginReducer.profile
    }
  }
}

export default connect( mapStateToProps,
  {updateReplyForm, resetReplyForm} )(Reply);
