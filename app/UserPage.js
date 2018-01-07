import React from 'react'
import update from 'react-addons-update'
import APIInvoker from './utils/APIInvoker'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import {
  getUserProfile,
  chageToEditMode,
  cancelEditMode,
  updateUserPageForm,
  userPageImageUpload,
  userPageSaveChanges,
  followUser,
  relogin}
from './actions/Actions'

class UserPage extends React.Component{

  constructor(props){
    super(props)
  }

  componentWillMount(){
    let user = this.props.params.user
    this.props.getUserProfile(user)
  }

  imageSelect(e){
    let id = e.target.id
    this.props.userPageImageUpload(e)
  }

  handleInput(e){
    this.props.updateUserPageForm(e)
  }

  cancelEditMode(e){
    this.props.cancelEditMode()
  }

  changeToEditMode(e){
    if(this.props.state.edit){
      this.props.userPageSaveChanges()
      this.props.relogin()
    }else{
      this.props.chageToEditMode()
    }
  }

  follow(e){
    if(!$('#followBtn').hasClass('disabled')){
      $('#followBtn').addClass('disabled')
      setTimeout(function(e){
        $('#followBtn').removeClass('disabled')
      }, 5000);
      this.props.followUser(this.props.params.user)
    }
  }

  render(){
    let profile = this.props.state.profile
    let storageUserName = window.localStorage.getItem("username")

    let bannerStyle = {
      backgroundImage: 'url(' + (profile.banner) + ')'
    }

    return(
      <div id="user-page" className="app-container">
        <header className="user-header">
          <div className="user-banner" style={bannerStyle}>
            <If condition={this.props.state.edit}>
              <div>
                <label htmlFor="bannerInput" className="btn select-banner">
                  <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
                  <p>Cambia tu foto de encabezado</p>
                </label>
                <input href="#" className="btn"
                  accept=".gif,.jpg,.jpeg,.png"
                  type="file" id="bannerInput"
                  onChange={this.imageSelect.bind(this)}  />
              </div>
            </If>
          </div>
          <div className="user-summary">
            <div className="container-fluid">
              <div className="row">
                <div className="hidden-xs col-sm-4 col-md-push-1
                  col-md-3 col-lg-push-1 col-lg-3" >
                </div>
                <div className="col-xs-12 col-sm-8 col-md-push-1
                  col-md-7 col-lg-push-1 col-lg-7">
                  <ul className="user-summary-menu">
                    <li className={this.props.route.tab === 'tweets' ?
                      'selected':''}>
                      <Link to={"/" + profile.userName}>
                        <p className="summary-label">TWEETS</p>
                        <p className="summary-value">{profile.tweetCount}</p>
                      </Link>
                    </li>
                    <li className={this.props.route.tab === 'followings' ?
                      'selected':''}>
                      <Link to={"/" + profile.userName + "/following" }>
                        <p className="summary-label">SIGUIENDO</p>
                        <p className="summary-value">{profile.following}</p>
                      </Link>
                    </li>
                    <li className={this.props.route.tab === 'followers' ?
                      'selected':''}>
                      <Link to={"/" + profile.userName + "/followers" }>
                        <p className="summary-label">SEGUIDORES</p>
                        <p className="summary-value">{profile.followers}</p>
                      </Link>
                    </li>
                  </ul>

                  <If condition={profile.userName === storageUserName}>
                    <button className="btn btn-primary  edit-button"
                      onClick={this.changeToEditMode.bind(this)}  >
                      {this.props.state.edit ? "Guardar" : "Editar perfil"}
                    </button>
                  </If>

                  <If condition={profile.follow != null &&
                    profile.userName !== storageUserName} >
                    <button id="followBtn" className="btn edit-button"
                      onClick={this.follow.bind(this)} >
                      {profile.follow
                        ? (<span><i className="fa fa-user-times"
                          aria-hidden="true"></i> Siguiendo</span>)
                        : (<span><i className="fa fa-user-plus"
                          aria-hidden="true"></i> Seguir</span>)
                      }
                    </button>
                  </If>

                  <If condition= {this.props.state.edit}>
                    <button className="btn edit-button" onClick=
                      {this.cancelEditMode.bind(this)} >Cancelar</button>
                  </If>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container-fluid">
          <div className="row">
            <div className="hidden-xs col-sm-4 col-md-push-1 col-md-3
              col-lg-push-1 col-lg-3" >
              <aside id="user-info">
                <div className="user-avatar">
                  <Choose>
                    <When condition={this.props.state.edit} >
                      <div className="avatar-box">
                        <img src={profile.avatar} />
                        <label htmlFor="avatarInput"
                          className="btn select-avatar">
                          <i className="fa fa-camera fa-2x"
                            aria-hidden="true"></i>
                          <p>Foto</p>
                        </label>
                        <input href="#" id="avatarInput"
                          className="btn" type="file"
                          accept=".gif,.jpg,.jpeg,.png"
                          onChange={this.imageSelect.bind(this)}
                           />
                      </div>
                    </When>
                    <Otherwise>
                      <div className="avatar-box">
                        <img src={profile.avatar} />
                      </div>
                    </Otherwise>
                  </Choose>
                </div>
                <Choose>
                  <When condition={this.props.state.edit} >
                    <div className="user-info-edit">
                      <input maxLength="20" type="text" value={profile.name}
                        onChange={this.handleInput.bind(this)} id="name"/>
                      <p className="user-info-username">@{profile.userName}</p>
                      <textarea  maxLength="180" id="description"
                        value={profile.description}
                        onChange={this.handleInput.bind(this)} />
                    </div>
                  </When>
                  <Otherwise>
                    <div>
                      <p className="user-info-name">{profile.name}</p>
                      <p className="user-info-username">@{profile.userName}</p>
                      <p className="user-info-description">
                        {profile.description}</p>
                    </div>
                  </Otherwise>
                </Choose>
              </aside>
            </div>
            <div className="col-xs-12 col-sm-8 col-md-7
              col-md-push-1 col-lg-7">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.userPageReducer
  }
}

export default connect(mapStateToProps,
  {getUserProfile, chageToEditMode, cancelEditMode, updateUserPageForm, userPageImageUpload, userPageSaveChanges, followUser, relogin})(UserPage);
