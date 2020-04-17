import React from 'react'
import APIInvoker from './utils/APIInvoker'
import {Link} from 'react-router-dom'

class SuggestedUser extends React.Component {

  constructor(args) {
    super(args)
    this.state = {
      load: false
    }
  }

  componentDidMount() {
    APIInvoker.invokeGET('/secure/suggestedUsers', response => {
      this.setState({
        load: true,
        users: response.body
      })
    }, error => {
      console.log("Error al actualizar el perfil", error);
    })
  }

  render() {
    return (
      <aside id="suggestedUsers" className="twitter-panel">
        <span className="su-title">A quién seguir</span>
        <If condition={this.state.load} >
          <For each="user" of={this.state.users}>
            <div className="sg-item" key={user._id}>
              <div className="su-avatar">
                <img src={user.avatar} alt={user.name} />
              </div>
              <div className="sg-body">
                <div>
                  <Link to={"/" + user.userName}>
                    <span className="sg-name">{user.name}</span>
                    <span className="sg-username">@{user.userName}</span>
                  </Link>
                </div>
                <Link to={"/" + user.userName}
                  className="btn btn-primary btn-sm">
                  <i className="fa fa-user-plus" aria-hidden="true"></i>
                      Ver perfil</Link>
              </div>
            </div>
          </For>
        </If>
      </aside>
    )
  }
}
export default SuggestedUser;
