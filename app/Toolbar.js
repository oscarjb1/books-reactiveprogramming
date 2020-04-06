import React from 'react'
import { browserHistory, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from './actions/Actions'

class Toolbar extends React.Component {
  constructor(props) {
    super(props)
  }

  logout(e) {
    e.preventDefault()
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("username")
    this.props.logout()
    window.location = '/login';
  }

  render() {

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <If condition={process.env.NODE_ENV !== 'production'}>
          <span className="visible-xs bs-test">XS</span>
          <span className="visible-sm bs-test">SM</span>
          <span className="visible-md bs-test">MD</span>
          <span className="visible-lg bs-test">LG</span>
        </If>

        <div className="container-fluid">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </Link>
              <ul id="menu">
                <li id="tbHome" className="selected">
                  <If condition={this.props.state.profile != null} >
                    <Link to="/">
                      <p className="menu-item"><i
                        className="fa fa-home menu-item-icon" aria-hidden="true">
                      </i>  <span className="hidden-xs hidden-sm">Inicio</span>
                      </p>
                    </Link>
                  </If>
                </li>
              </ul>
            </div>
            <If condition={this.props.state.profile != null} >
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown"
                    role="button" aria-haspopup="true" aria-expanded="false">
                    <img className="navbar-avatar"
                      src={this.props.state.profile.avatar}
                      alt={this.props.state.profile.userName} />
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={"/" + this.props.state.profile.userName}>
                        Ver perfil</Link>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li>
                      <a href="#" onClick={this.logout.bind(this)}>Cerrar sesión</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </If>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: {
      profile: state.loginReducer.profile
    }
  }
}

export default connect(mapStateToProps, { logout })(Toolbar);
