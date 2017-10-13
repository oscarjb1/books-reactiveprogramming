import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

class UserCard extends React.Component{
  constructor(props){
    super(props)
  }

  render(){

    let user = this.props.user
    let css = {
      backgroundImage: 'url(' +user.banner + ')'
    }

    return(
      <article className="user-card" >
        <header className="user-card-banner" style={css}>
          <img src={user.avatar} className="user-card-avatar"/>
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
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserCard;
