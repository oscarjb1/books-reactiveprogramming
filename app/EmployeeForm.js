import React from 'react'

class EmployeeForm extends React.Component{

  constructor(){
    super(...arguments)
    this.state = {
      firstName: '',
      lastName: '',
      age: ''
    }
  }

  componentDidMount(){
    this.firstName.focus()
  }

  handleChanges(e){
    let newState = Object.assign(
    this.state, {[e.target.id]: e.target.value})
    this.setState(newState)
  }

  saveEmployee(e){
    this.props.save(this.state)
  }

  render(){
    return (
      <form>
        <label htmlFor='firstName'>Nombre</label>
        <input ref={self => this.firstName = self} id='firstName'
          type='text' value={this.state.firstName}
          onChange={this.handleChanges.bind(this)}/>
        <br/>
        <label htmlFor='lastName'>Apellido</label>
        <input id='lastName' type='text' value={this.state.lastName}
          onChange={this.handleChanges.bind(this)}/>
        <br/>
        <label htmlFor='age'>Edad</label>
        <input id='age' type='number' value={this.state.age}
          onChange={this.handleChanges.bind(this)}/>
        <br/>
        <button onClick={this.saveEmployee.bind(this)}>Guardar</button>
      </form>
    )
  }
}
export default EmployeeForm
