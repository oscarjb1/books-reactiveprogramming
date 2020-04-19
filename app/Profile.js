import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Profile = (props) => {

  return (
    <aside id="profile" className="twitter-panel">
      <div className="profile-banner">
        <Link to={"/" + props.profile.userName}
          className="profile-name" style={{
            backgroundImage: (props.profile.banner!=null
                ? `url('${props.profile.banner}')`
                : 'none')}}
          />
        </div>
      <div className="profile-body">
        <img className="profile-avatar" src={props.profile.avatar} />
        <Link to={"/" + props.profile.userName}
          className="profile-name">
          {props.profile.name}
        </Link>
        <Link to={"/" + props.profile.userName}
          className="profile-username">
          @{props.profile.userName}
        </Link>
      </div>
      <div className="profile-resumen">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-3">
              <Link to={`/${props.profile.userName}`}>
                <p className="profile-resumen-title">TWEETS</p>
                <p className="profile-resumen-value">
                  {props.profile.tweetCount}</p>
              </Link>
            </div>
            <div className="col-xs-4">
              <Link to={`/${props.profile.userName}/following`}>
                <p className="profile-resumen-title">SIGUIENDO</p>
                <p className="profile-resumen-value">
                  {props.profile.following}</p>
              </Link>
            </div>
            <div className="col-xs-5">
              <Link to={`/${props.profile.userName}/followers`}>
                <p className="profile-resumen-title">SEGUIDORES</p>
                <p className="profile-resumen-value">
                  {props.profile.followers}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired
}

export default Profile;
