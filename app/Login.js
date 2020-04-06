import React from 'react'
import update from 'immutability-helper'
import APIInvoker from './utils/APIInvoker'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateLoginForm, loginRequest } from './actions/Actions'
import Toolbar from './Toolbar'

class Login extends React.Component {

  constructor() {
    super(...arguments)
  }

  handleInput(e) {
    this.props.updateLoginForm(e.target.name, e.target.value)
  }

  login(e) {
    e.preventDefault()
    this.props.loginRequest()
  }

  render() {

    return (
      <div id="signup" className="animated fadeIn">
        <div className="container" >
          <div className="row">
            <div className="col-xs-12">
            </div>
          </div>
        </div>
        <div className="signup-form">
          <form onSubmit={this.login.bind(this)}>
            <h1>Iniciar sesión en Twitter</h1>

            <input type="text" value={this.props.state.username}
              placeholder="usuario" name="username" id="username"
              onChange={this.handleInput.bind(this)} />
            <label ref="usernameLabel" id="usernameLabel"
              htmlFor="username"></label>

            <input type="password" id="passwordLabel"
              value={this.props.state.password} placeholder="Contraseña"
              name="password" onChange={this.handleInput.bind(this)} />
            <label ref="passwordLabel" htmlFor="passwordLabel"></label>

            <button className="btn btn-primary btn-lg " id="submitBtn"
              onClick={this.login.bind(this)}>Regístrate</button>
            <If condition={this.props.state.loginError}>
              <label id="submitBtnLabel" htmlFor="submitBtn" className="shake animated">{this.props.state.loginMessage}</label>
            </If>

            <p className="bg-danger user-test">Crea un usuario o usa el usuario
              <strong>test/1234</strong></p>
            <p>¿No tienes una cuenta? <Link to="/signup">Registrate</Link> </p>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: {
      username: state.loginFormReducer.username,
      password: state.loginFormReducer.password,
      loginError: state.loginFormReducer.loginError,
      loginMessage: state.loginFormReducer.loginMessage
    }
  }
}

export default connect(mapStateToProps, { updateLoginForm, loginRequest })(Login)
