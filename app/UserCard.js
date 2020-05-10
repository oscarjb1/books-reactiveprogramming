import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const UserCard = ({ user }) => {

  return (
    <article className="user-card" >
      <header className="user-card-banner" style={{ backgroundImage: 'url(' + user.banner + ')' }}>
        <img src={user.avatar} className="user-card-avatar" />
      </header>
      <div className="user-card-body">
        <Link to={"/" + user.userName} className="user-card-name" >
          <p>{user.name}</p>
        </Link>
        <Link to={"/" + user.userName} className="user-card-username">
          <p>@{user.userName}</p>
        </Link>
        <p className="user-card-description">{user.description}</p>
      </div>
    </article>
  )
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserCard
