import React from 'react'
import { render } from 'react-dom'
import APIInvoker from "./utils/APIInvoker"
import TweetsContainer from './TweetsContainer'

class App extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return (
      <TweetsContainer />
    )
  }
}

render(<App/>, document.getElementById('root'));
