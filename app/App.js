import React from 'react'
import { render } from 'react-dom'

class App extends React.Component{

  render(){
    return(
      <React.Fragment>
        <h1>Hello World</h1>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/210px-React-icon.svg.png"></img>
      </React.Fragment>
    )
  }
}
render(<App/>, document.getElementById('root'));
