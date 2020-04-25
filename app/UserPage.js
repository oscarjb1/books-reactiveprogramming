import React, {useEffect} from 'react'
import update from 'immutability-helper'
import APIInvoker from './utils/APIInvoker'
import { NavLink } from 'react-router-dom'
import MyTweets from './MyTweets'
import { Route, Switch } from 'react-router-dom'
import Followings from './Followings'
import Followers from './Followers'
import TweetDetail from './TweetDetail'
import Modal from './Modal'
import UserContext from './context/UserContext'

const UserPage = (props) => {

  const userContext = React.useContext(UserContext)

  const [profile, setProfile] = React.useState({
    name: "",
    description: "",
    avatar: null,
    banner: null,
    userName: ""
  })

  const [edit, setEdit] = React.useState(false)

  useEffect(() => {
    let username = props.match.params.user
    APIInvoker.invokeGET(`/profile/${username}`, response => {
      setEdit(false)
      setProfile(response.body)
    }, error => {
      console.log("Error al cargar los Tweets");
      window.location = '/'
    })
  }, [props.match.params.user])


  const follow = (e) => {
    let request = {
      followingUser: props.match.params.user
    }
    APIInvoker.invokePOST('/secure/follow', request, response => {
      if (response.ok) {
        setProfile(update(profile, {
          follow: { $set: !response.unfollow }
        }))
      }
    }, error => {
      console.log("Error al actualizar el perfil");
    })
  }

  const changeToEditMode = (e) => {
    if (edit) {
      let request = {
        username: profile.userName,
        name: profile.name,
        description: profile.description,
        avatar: profile.avatar,
        banner: profile.banner
      }

      APIInvoker.invokePUT('/secure/profile', request, response => {
        if (response.ok) {
          setEdit(false)
        }
      }, error => {
        console.log("Error al actualizar el perfil");
      })
    } else {
      let currentState = profile
      setEdit(true)
      setProfile({
        ...profile,
        currentState
      })
    }
  }

  const imageSelect = (e) => {
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
        setProfile(update(profile, {
          banner: { $set: reader.result }
        }))
      } else {
        setProfile(update(profile, {
          avatar: { $set: reader.result }
        }))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleInput = (e) => {
    let id = e.target.id
    setProfile(update(profile, {
      [id]: { $set: e.target.value }
    }))
  }

  const cancelEditMode = (e) => {
    setEdit(false)
    setProfile(profile.currentState)
  }


  return (
    <div id="user-page" className="app-container">
      <header className="user-header">
        <div className="user-banner" style={{ backgroundImage: 'url(' + (profile.banner) + ')' }}>
          <If condition={edit}>
            <div>
              <label htmlFor="bannerInput" className="btn select-banner">
                <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
                <p>Cambia tu foto de encabezado</p>
              </label>
              <input href="#" className="btn"
                accept=".gif,.jpg,.jpeg,.png"
                type="file" id="bannerInput"
                onChange={imageSelect} />
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

                <If condition={profile.userName === userContext.userName}>
                  <button className="btn btn-primary  edit-button"
                    onClick={changeToEditMode}  >
                    {edit ? "Guardar" : "Editar perfil"}</button>
                </If>


                <If condition={profile.follow != null &&
                  profile.userName !== userContext.userName} >
                  <button className="btn edit-button"
                    onClick={follow} >
                    {profile.follow
                      ? (<span><i className="fa fa-user-times"
                        aria-hidden="true"></i> Siguiendo</span>)
                      : (<span><i className="fa fa-user-plus"
                        aria-hidden="true"></i> Seguir</span>)
                    }
                  </button>
                </If>

                <If condition={edit}>
                  <button className="btn edit-button" onClick=
                    {cancelEditMode} >Cancelar</button>
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
                  <When condition={edit} >
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
                        onChange={imageSelect}
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
                <When condition={edit} >
                  <div className="user-info-edit">
                    <input maxLength="20" type="text" value={profile.name}
                      onChange={handleInput} id="name" />
                    <p className="user-info-username">@{profile.userName}</p>
                    <textarea maxLength="180" id="description"
                      value={profile.description}
                      onChange={handleInput} />
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
                () => <MyTweets profile={profile} />} />
              <Route exact path="/:user/followers" component={
                () => <Followers profile={profile} />} />
              <Route path="/:user/following" component={
                () => <Followings profile={profile} />} />
              <Route exact path="/:user/tweet/:tweet" component={
                (params) => <Modal> <TweetDetail {...params} /> </Modal>} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserPage;
