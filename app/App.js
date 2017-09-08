import React from 'react'
import { render } from 'react-dom'
import APIInvoker from "./utils/APIInvoker"
import TweetsContainer from './TweetsContainer'
import FormTest from './FormTest'
import Signup from './Signup'
import Login from './Login'

class App extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return (
      <Login/>
    )
  }
}

render(<App/>, document.getElementById('root'));
