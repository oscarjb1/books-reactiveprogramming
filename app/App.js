import React from 'react'
import { render } from 'react-dom'
import TweetsContainer from './TweetsContainer'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container">
        <TweetsContainer />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));