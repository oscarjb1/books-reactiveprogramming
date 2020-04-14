import React from 'react'
import update from 'immutability-helper'
import APIInvoker from './utils/APIInvoker'

class Signup extends React.Component{

  constructor(){
    super(...arguments)
    this.state = {
      username: "",
      name:"",
      password: "",
      userOk: false,
      license: false
    }
  }

  handleInput(e){
    let field = e.target.name
    let value = e.target.value
    let type = e.target.type

    if(field === 'username'){
      value = value.replace(' ','').replace('@','').substring(0, 15)
      this.setState(update(this.state,{
        [field] : {$set: value}
      }))
    }else if(type === 'checkbox'){
      this.setState(update(this.state,{
        [field] : {$set: e.target.checked}
      }))

    }else{
      this.setState(update(this.state,{
        [field] : {$set: value}
      }))
    }
  }

  validateUser(e){
    let username = e.target.value
    APIInvoker.invokeGET('/usernameValidate/' + username, response => {
      this.setState(update(this.state, {
        userOk: {$set: true}
      }))
      this.refs.usernameLabel.innerHTML = response.message
      this.refs.usernameLabel.className = 'fadeIn animated ok'
    },error => {
      console.log("Error al cargar los Tweets");
      this.setState(update(this.state,{
        userOk: {$set: false}
      }))
      this.refs.usernameLabel.innerHTML = error.message
      this.refs.usernameLabel.className = 'fadeIn animated fail'
    })
  }


  signup(e){
    e.preventDefault()

    if(!this.state.license){
      this.refs.submitBtnLabel.innerHTML =
        'Acepte los términos de licencia'
      this.refs.submitBtnLabel.className = 'shake animated'
      return
    }else if(!this.state.userOk){
      this.refs.submitBtnLabel.innerHTML =
        'Favor de revisar su nombre de usuario'
      this.refs.submitBtnLabel.className = ''
      return
    }

    this.refs.submitBtnLabel.innerHTML = ''
    this.refs.submitBtnLabel.className = ''

    let request = {
    	"name": this.state.name,
    	"username": this.state.username,
    	"password": this.state.password
    }

    APIInvoker.invokePOST('/signup',request, response => {
      // browserHistory.push('/login');
      alert('Usuario registrado correctamente');
    },error => {
      console.log("Error al cargar los Tweets");
      this.refs.submitBtnLabel.innerHTML = response.error
      this.refs.submitBtnLabel.className = 'shake animated'
    })
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
            <input type="text" value={this.state.username}
              placeholder="@usuario" name="username" id="username"
              onBlur={this.validateUser.bind(this)}
              onChange={this.handleInput.bind(this)}/>
            <label ref="usernameLabel" id="usernameLabel"
              htmlFor="username"></label>

            <input type="text" value={this.state.name} placeholder="Nombre"
              name="name" id="name" onChange={this.handleInput.bind(this)}/>
            <label ref="nameLabel" id="nameLabel" htmlFor="name"></label>

            <input type="password" id="passwordLabel"
              value={this.state.password} placeholder="Contraseña"
              name="password" onChange={this.handleInput.bind(this)}/>
            <label ref="passwordLabel"  htmlFor="passwordLabel"></label>

            <input id="license" type="checkbox" ref="license"
              value={this.state.license} name="license"
              onChange={this.handleInput.bind(this)} />
            <label htmlFor="license" >Acepto los terminos de licencia</label>

            <button className="btn btn-primary btn-lg " id="submitBtn"
              onClick={this.signup.bind(this)}>Regístrate</button>
            <label ref="submitBtnLabel" id="submitBtnLabel" htmlFor="submitBtn"
              className="shake animated hidden "></label>
            <p className="bg-danger user-test">Crea un usuario o usa el usuario
              <strong>test/test</strong></p>
            {/* <p>¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link> </p> */}
            <p>¿Ya tienes cuenta? Iniciar sesión</p>
          </form>
        </div>
      </div>
    )
  }
}
export default Signup;
