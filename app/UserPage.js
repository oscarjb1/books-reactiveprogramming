import React from 'react'
import update from 'immutability-helper'
import APIInvoker from './utils/APIInvoker'
import { NavLink } from 'react-router-dom'
import MyTweets from './MyTweets'
import { Route, Switch } from 'react-router-dom'
import Followings from './Followings'
import Followers from './Followers'
import TweetDetail from './TweetDetail'
import Modal from './Modal'

class UserPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      profile: {
        name: "",
        description: "",
        avatar: null,
        banner: null,
        userName: ""
      }
    }
  }

  componentDidMount() {
    let user = this.props.match && this.props.match.params.user
    this.getUserProfile(user)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let newProfile = this.props.match.params.user
    let prevProfile = prevProps.match.params.user
    if (newProfile != prevProfile) {
      this.getUserProfile(newProfile)
    }
  }

  getUserProfile(user) {
    APIInvoker.invokeGET('/profile/' + user, response => {
      this.setState({
        edit: false,
        profile: response.body
      });
    }, error => {
      console.log("Error al cargar los Tweets");
      window.location = '/'
    })
  }

  follow(e) {
    let request = {
      followingUser: this.props.match.params.user
    }
    APIInvoker.invokePOST('/secure/follow', request, response => {
      if (response.ok) {
        this.setState(update(this.state, {
          profile: {
            follow: { $set: !response.unfollow }
          }
        }))
      }
    }, error => {
      console.log("Error al actualizar el perfil");
    })
  }

  changeToEditMode(e) {
    if (this.state.edit) {
      let request = {
        username: this.state.profile.userName,
        name: this.state.profile.name,
        description: this.state.profile.description,
        avatar: this.state.profile.avatar,
        banner: this.state.profile.banner
      }

      APIInvoker.invokePUT('/secure/profile', request, response => {
        if (response.ok) {
          this.setState(update(this.state, {
            edit: { $set: false }
          }))
        }
      }, error => {
        console.log("Error al actualizar el perfil");
      })
    } else {
      let currentState = this.state.profile
      this.setState(update(this.state, {
        edit: { $set: true },
        currentState: { $set: currentState }
      }))
    }
  }

  imageSelect(e) {
    let id = e.target.id
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file.size > 1240000) {
      alert('La imagen supera el máximo de 1MB')
      return
    }

    reader.onloadend = () => {
      if (id == 'bannerInput') {
        this.setState(update(this.state, {
          profile: {
            banner: { $set: reader.result }
          }
        }))
      } else {
        this.setState(update(this.state, {
          profile: {
            avatar: { $set: reader.result }
          }
        }))
      }
    }
    reader.readAsDataURL(file)
  }

  handleInput(e) {
    let id = e.target.id
    this.setState(update(this.state, {
      profile: {
        [id]: { $set: e.target.value }
      }
    }))
  }

  cancelEditMode(e) {
    let currentState = this.state.currentState
    this.setState(update(this.state, {
      edit: { $set: false },
      profile: { $set: currentState }
    }))
  }

  render() {
    let profile = this.state.profile
    let storageUserName = window.localStorage.getItem("username")

    let bannerStyle = {
      backgroundImage: 'url(' + (profile.banner) + ')'
    }

    return (
      <div id="user-page" className="app-container">
        <header className="user-header">
          <div className="user-banner" style={bannerStyle}>
            <If condition={this.state.edit}>
              <div>
                <label htmlFor="bannerInput" className="btn select-banner">
                  <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
                  <p>Cambia tu foto de encabezado</p>
                </label>
                <input href="#" className="btn"
                  accept=".gif,.jpg,.jpeg,.png"
                  type="file" id="bannerInput"
                  onChange={this.imageSelect.bind(this)} />
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
                    <li>
                      <NavLink to={`/${profile.userName}`} exact
                        activeClassName="selected">
                        <p className="summary-label">TWEETS</p>
                        <p className="summary-value">{profile.tweetCount}</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/${profile.userName}/following`}
                        activeClassName="selected">
                        <p className="summary-label">SIGUIENDO</p>
                        <p className="summary-value">{profile.following}</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/${profile.userName}/followers`}
                        activeClassName="selected">
                        <p className="summary-label">SEGUIDORES</p>
                        <p className="summary-value">{profile.followers}</p>
                      </NavLink>
                    </li>
                  </ul>

                  <If condition={profile.userName === storageUserName}>
                    <button className="btn btn-primary  edit-button"
                      onClick={this.changeToEditMode.bind(this)}  >
                      {this.state.edit ? "Guardar" : "Editar perfil"}</button>
                  </If>


                  <If condition={profile.follow != null &&
                    profile.userName !== storageUserName} >
                    <button className="btn edit-button"
                      onClick={this.follow.bind(this)} >
                      {profile.follow
                        ? (<span><i className="fa fa-user-times"
                          aria-hidden="true"></i> Siguiendo</span>)
                        : (<span><i className="fa fa-user-plus"
                          aria-hidden="true"></i> Seguir</span>)
                      }
                    </button>
                  </If>

                  <If condition={this.state.edit}>
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
                    <When condition={this.state.edit} >
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
                  <When condition={this.state.edit} >
                    <div className="user-info-edit">
                      <input maxLength="20" type="text" value={profile.name}
                        onChange={this.handleInput.bind(this)} id="name" />
                      <p className="user-info-username">@{profile.userName}</p>
                      <textarea maxLength="180" id="description"
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
              <Switch>
                <Route exact path="/:user" component={
                  () => <MyTweets profile={this.state.profile} />} />
                <Route exact path="/:user/followers" component={
                  () => <Followers profile={this.state.profile} />} />
                <Route path="/:user/following" component={
                  () => <Followings profile={this.state.profile} />} />
                <Route exact path="/:user/tweet/:tweet" component={
                  (params) => <Modal> <TweetDetail {...params} /> </Modal>} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default UserPage;
