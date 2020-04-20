import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import UserContext from './context/UserContext'

const Toolbar = (props) => {

    const logout = (e) => {
        e.preventDefault()
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("username")
        window.location = '/login';
    }

    return (
        <UserContext.Consumer>
            {context => <nav className="navbar navbar-default navbar-fixed-top">
                <span className="visible-xs bs-test">XS</span>
                <span className="visible-sm bs-test">SM</span>
                <span className="visible-md bs-test">MD</span>
                <span className="visible-lg bs-test">LG</span>

                <div className="container-fluid">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/">
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                            </Link>
                            <ul id="menu">
                                <li id="tbHome" className="selected">
                                    <NavLink to="/" activeClassName="selected">
                                        <p className="menu-item">
                                            <i className="fa fa-home menu-item-icon"
                                                aria-hidden="true" />
                                            <span className="hidden-xs hidden-sm">Inicio</span>
                                        </p>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <If condition={context != null} >
                            <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                        data-toggle="dropdown" role="button"
                                        aria-haspopup="true" aria-expanded="false">
                                        <img className="navbar-avatar"
                                            src={context.avatar}
                                            alt={context.userName} />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to={`/${context.userName}`}>
                                                Ver perfil</Link>
                                        </li>
                                        <li role="separator" className="divider"></li>
                                        <li>
                                            <Link to="#" onClick={logout}>
                                                Cerrar sesión</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </If>
                    </div>
                </div>
            </nav>}
        </UserContext.Consumer>
    )
}

export default Toolbar