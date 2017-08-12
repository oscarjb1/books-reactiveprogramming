import React from 'react'
import { render } from 'react-dom'
import ListItem from './ListItem'

class App extends React.Component{

  render(){
    let items = [{
        name: 'Item 1',
        price: 100
      }, {
        name: 'Item 2',
        price: 200
    }]

    return (
      <ul>
        <For each="item" index='index' of={ items }>
          <ListItem product={item}  />
        </For>
      </ul>
    )
  }
}

render(<App/>, document.getElementById('root'));
