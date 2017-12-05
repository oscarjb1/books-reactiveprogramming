import React from 'react'
import update from 'react-addons-update'
import APIInvoker from './utils/APIInvoker'
import { Link } from 'react-router'
import {updateSignupForm, validateUser, signup} from './actions/Actions'
import {connect} from 'react-redux'

class Signup extends React.Component{

  constructor(){
    super(...arguments)
    // this.state = {
    //   username: "",
    //   name:"",
    //   password: "",
    //   userOk: false,
    //   license: false
    // }
  }

  handleInput(e){
    let field = e.target.name
    let value = e.target.value
    let type = e.target.type

    if(field === 'username'){
     value = value.replace(' ','').replace('@','').substring(0, 15)
    }else if(type === 'checkbox'){
     value = e.target.checked
    }

    this.props.updateSignupForm(field,value)

    // if(field === 'username'){
    //   value = value.replace(' ','').replace('@','').substring(0, 15)
    //   this.setState(update(this.state,{
    //     [field] : {$set: value}
    //   }))
    // }else if(type === 'checkbox'){
    //   this.setState(update(this.state,{
    //     [field] : {$set: e.target.checked}
    //   }))
    //
    // }else{
    //   this.setState(update(this.state,{
    //     [field] : {$set: value}
    //   }))
    // }
  }

  validateUser(e){
    let username = e.target.value
    this.props.validateUser(username)

    // APIInvoker.invokeGET('/usernameValidate/' + username, response => {
    //   this.setState(update(this.state, {
    //     userOk: {$set: true}
    //   }))
    //   this.refs.usernameLabel.innerHTML = response.message
    //   this.refs.usernameLabel.className = 'fadeIn animated ok'
    // },error => {
    //   console.log("Error al cargar los Tweets");
    //   this.setState(update(this.state,{
    //     userOk: {$set: false}
    //   }))
    //   this.refs.usernameLabel.innerHTML = error.message
    //   this.refs.usernameLabel.className = 'fadeIn animated fail'
    // })
  }


  signup(e){
    e.preventDefault()
    this.props.signup()

    // if(!this.state.license){
    //   this.refs.submitBtnLabel.innerHTML =
    //     'Acepte los términos de licencia'
    //   this.refs.submitBtnLabel.className = 'shake animated'
    //   return
    // }else if(!this.state.userOk){
    //   this.refs.submitBtnLabel.innerHTML =
    //     'Favor de revisar su nombre de usuario'
    //   this.refs.submitBtnLabel.className = ''
    //   return
    // }
    //
    // this.refs.submitBtnLabel.innerHTML = ''
    // this.refs.submitBtnLabel.className = ''
    //
    // let request = {
    // 	"name": this.state.name,
    // 	"username": this.state.username,
    // 	"password": this.state.password
    // }
    //
    // APIInvoker.invokePOST('/signup',request, response => {
    //   browserHistory.push('/login');
    //   alert('Usuario registrado correctamente');
    // },error => {
    //   console.log("Error al cargar los Tweets");
    //   this.refs.submitBtnLabel.innerHTML = response.error
    //   this.refs.submitBtnLabel.className = 'shake animated'
    // })
  }

  render(){

    return (
      <div id="signup">
        <div className="container" >
          <div className="row">
            <div className="col-xs-12">

            </div>
          </div>
        </div>
        <div className="signup-form">
          <form onSubmit={this.signup.bind(this)}>
            <h1>Únite hoy a Twitter</h1>
            <input type="text" value={this.props.state.username}
              placeholder="@usuario" name="username" id="username"
              onBlur={this.validateUser.bind(this)}
              onChange={this.handleInput.bind(this)}/>
            <If condition={this.props.state.userOkMessage !== null}>
              <label ref="usernameLabel" id="usernameLabel"
                className={this.props.state.userOk ? 'fadeIn animated ok' :
                'fadeIn animated fail'} htmlFor="username">
                {this.props.state.userOkMessage}</label>
            </If>

            <input type="text" value={this.props.state.name}
              placeholder="Nombre"
              name="name" id="name"
              onChange={this.handleInput.bind(this)}/>
            <label ref="nameLabel" id="nameLabel" htmlFor="name"></label>

            <input type="password" id="passwordLabel"
              value={this.props.state.password} placeholder="Contraseña"
              name="password" onChange={this.handleInput.bind(this)}/>
            <label ref="passwordLabel"  htmlFor="passwordLabel"></label>

            <input id="license" type="checkbox" ref="license"
              value={this.props.state.license} name="license"
              onChange={this.handleInput.bind(this)} />
            <label htmlFor="license" >Acepto los terminos de licencia</label>

            <button className="btn btn-primary btn-lg " id="submitBtn"
              onClick={this.signup.bind(this)}>Regístrate</button>
            <If condition ={this.props.state.signupFailMessage !== null}>
              <label ref="submitBtnLabel"
                id="submitBtnLabel" htmlFor="submitBtn"
                className="shake animated">
                {this.props.state.signupFailMessage}</label>
            </If>
            <p className="bg-danger user-test">
              Crea un usuario o usa el usuario
              <strong>test/test</strong></p>
            <p>¿Ya tienes cuenta? <Link to="/login">
              Iniciar sesión</Link> </p>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.signupFormReducer
  }
}

export default connect(mapStateToProps,
  {updateSignupForm, validateUser, signup})(Signup);
