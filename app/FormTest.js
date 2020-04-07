import React from 'react'
import update from 'immutability-helper'

class FormTest extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      field: "Init values"
    }
  }

  updateField(e){
    this.setState(update(this.state, {
      field: {$set: e.target.value}
    }))
  }

  submitForm(e){
    alert(this.state.field)
    alert(e.target.field2.value)
    e.preventDefault();
  }

  render(){
    return (
      <div>
        <input type="text" value={this.state.field}
          onChange={this.updateField.bind(this)}/>
          <br/>
        <form onSubmit={this.submitForm.bind(this)} >
          <input type="text" name="field2" />
          <br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
export default FormTest
